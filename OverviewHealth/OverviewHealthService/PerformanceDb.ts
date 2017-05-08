import * as pg from "pg";
import * as moment from "moment";

import { BacklogHistory, Counters, Customer, CustomerBacklog, CustomerBacklogHistory, CustomerCounter, TrackerBacklog } from "@chrismh/ov-common";

export class PerformanceDb
{
    private pgPool: pg.Pool;

    constructor()
    {
        let connection = {
            host: "odb.logikos.com",
            port: 21000,
            database: "performance",
            user: "performanceuser",
            password: "performance0817",
            max: 2, // Maximum clients in the pool
            idleTimeoutMillis: 30000 // Time a client can remain idle before closing
        };

        this.pgPool = new pg.Pool(connection);

        this.pgPool.on("error",
            (err: Error, client: pg.Client) =>
            {
                console.error("Idle client error", err.message, err.stack);
            });
    }

    public getCustomers(): Promise<Array<Customer>>
    {
        let query = "SELECT c.id, c.name \
                     FROM customers AS c \
                     WHERE c.active IS TRUE \
                     ORDER BY c.name;";
        
        return new Promise((resolve: (value: Array<Customer>) => void, reject: (reason?: Error) => void) =>
        {
            this.pgPool.query(query)
                .then((queryResult: pg.QueryResult) =>
                {
                    let result = new Array<Customer>();
                    queryResult.rows.forEach((row: any) =>
                    {
                        result.push(new Customer(row.id, row.name));
                    });
                    resolve(result);
                },
                (reason: Error) => reject(reason));
        });
    }

    public getBacklog(): Promise<Array<CustomerBacklog>>
    {
        let query = "SELECT c.id AS customer_id, c.name AS customer_name, \
                            cs.backlog AS customer_backlog, cs.stat_time AS customer_stat_time, \
                            cs.last_received_on AS customer_last_received_on, cs.total_received AS customer_total_received, \
                            t.id AS tracker_id, t.name AS tracker_name, t.asset_name AS asset_name, \
                            ts.backlog AS tracker_backlog, ts.stat_time AS tracker_stat_time, \
                            ts.last_received_on AS tracker_last_received_on, ts.total_received AS tracker_total_received \
                     FROM customers AS c \
                     JOIN customer_stats AS cs ON cs.id = c.customer_stat_id \
                     LEFT JOIN tracker_stats AS ts ON ts.customer_stat_id = c.customer_stat_id \
                     LEFT JOIN trackers AS t ON t.id = ts.tracker_id \
                     WHERE c.active IS TRUE \
                     ORDER BY cs.backlog DESC, ts.backlog DESC; ";

        return new Promise((resolve: (value: Array<CustomerBacklog>) => void, reject: (reason?: Error) => void) =>
        {
            this.pgPool.query(query, undefined)
                .then((queryResult: pg.QueryResult) =>
                    {
                        let result = new Array<CustomerBacklog>();

                        queryResult.rows.forEach((row: any) =>
                        {
                            if (result.length === 0 || result[result.length - 1].customerId !== row.customer_id)
                            {
                                let customerBacklog = new CustomerBacklog(
                                    row.customer_id,
                                    row.customer_name,
                                    moment(row.customer_stat_time).toDate(),
                                    row.customer_backlog,
                                    moment(row.customer_last_received_on).toDate(),
                                    row.customer_total_received);

                                result.push(customerBacklog);
                            }

                            if (!row.tracker_id)
                                return;

                            let trackerBacklog = new TrackerBacklog(
                                row.tracker_id,
                                row.tracker_name,
                                row.asset_name,
                                moment(row.tracker_stat_time).toDate(),
                                row.tracker_backlog,
                                moment(row.tracker_last_received_on).toDate(),
                                row.tracker_total_received);
                            result[result.length - 1].trackerBacklog.push(trackerBacklog);
                        });

                        resolve(result);
                    },
                    (reason: Error) =>
                    {
                        reject(reason);
                    });
        });
    }

    public getCounters(): Promise<Counters>
    {
        let query = "SELECT cnt.stat_time, cnt.pct_processor_time, cnt.available_m_bytes, cnt.pct_paging_file_usage, \
                            cnt.database_connections, cnt.idle_database_connections, \
                            cc.customer_id, c.name AS customer_name, \
                            cc.database_connections AS customer_database_connections, cc.idle_database_connections AS customer_idle_database_connections \
                     FROM global_counter AS gc \
                     JOIN counters AS cnt ON cnt.id = gc.counter_id \
                     JOIN customer_counters AS cc ON cc.counter_id = gc.counter_id \
                     JOIN customers AS c ON c.id = cc.customer_id \
                     WHERE c.active IS TRUE ";

        return new Promise((resolve: (value: Counters) => void, reject: (reason?: Error) => void) =>
        {
            this.pgPool.query(query, undefined)
                .then((queryResult: pg.QueryResult) =>
                    {
                        let result: Counters = undefined;

                        queryResult.rows.forEach((row: any) =>
                        {
                            if (result === undefined)
                            {
                                result = new Counters(
                                    moment(row.stat_time).toDate(),
                                    row.pct_processor_time,
                                    row.available_m_bytes,
                                    row.pct_paging_file_usage,
                                    row.database_connections,
                                    row.idle_database_connections);
                            }

                            let customerCounter = new CustomerCounter(
                                row.customer_id,
                                row.customer_name,
                                row.customer_database_connections,
                                row.customer_idle_database_connections);
                            result.customerCounters.push(customerCounter);
                        });

                        resolve(result);
                    },
                    (reason: Error) => reject(reason));
        });
    }


    public getBacklogHistory(afterTime: moment.Moment, beforeTime: moment.Moment): Promise<Array<BacklogHistory>>
    {
        let query = 
            "SELECT cs.stat_time, SUM(cs.backlog)::integer AS backlog  \
            FROM customer_stats AS cs \
            JOIN customers AS c on c.id = cs.customer_id \
            WHERE c.active IS TRUE \
            AND cs.stat_time > $1 AT TIME ZONE 'UTC' \
            AND cs.stat_time < $2 AT TIME ZONE 'UTC' \
            GROUP BY cs.stat_time \
            ORDER BY cs.stat_time;"
         
        return new Promise((resolve: (value: Array<BacklogHistory>) => void, reject: (reason?: Error) => void) =>
        {
            this.pgPool.query(query, [afterTime.toISOString(), beforeTime.toISOString()])
                .then((queryResult: pg.QueryResult) =>
                {
                    let result = new Array<BacklogHistory>();

                    queryResult.rows.forEach((row: any) =>
                    {
                        result.push(new BacklogHistory(moment(row.stat_time).toDate(), row.backlog))
                    });

                    resolve(result);
                },
                (reason: Error) => reject(reason));
        });

        /*
        using (var db = ConnectionCache.Performance.Database)
                {
                    var querySql = "SELECT cs.stat_time, SUM(cs.backlog)::integer AS backlog " + 
                                  $"FROM {Tbl.CustomerStats} AS cs " +
                                  $"JOIN {Tbl.Customers} AS c on c.id = cs.customer_id " +
                                  "WHERE c.active IS TRUE " +
                                  $"AND cs.stat_time > '{queryModel.AfterTime.ToUniversalTime():yyyy-MM-ddTHH:mm:ssZ}' AT TIME ZONE 'UTC' " + 
                                  $"AND cs.stat_time < '{queryModel.BeforeTime.ToUniversalTime():yyyy-MM-ddTHH:mm:ssZ}' AT TIME ZONE 'UTC' " + 
                                   "GROUP BY cs.stat_time " + 
                                   "ORDER BY cs.stat_time";
                    var rows = db.ExecuteReader(querySql);
                    
                    foreach(var row in rows)
                    {
                        var backlogHistoryEntry = new BacklogHistoryModel
                        {
                            StatTime = row.ToDate("stat_time"),
                            Backlog = row.ToInt32("backlog")
                        };

                        result.Add(backlogHistoryEntry);
                    }
                }
        */
    }

    
    public getCustomerBacklogHistory(afterTime: moment.Moment, beforeTime: moment.Moment, customerIds?: number[]): Promise<Array<CustomerBacklogHistory>>
    {
        let query =
            `SELECT cs.stat_time, cs.customer_id, c.name AS customer_name, cs.backlog 
            FROM customer_stats AS cs
            JOIN customers AS c ON c.id = cs.customer_id
            WHERE cs.stat_time > $1 AT TIME ZONE 'UTC'
            AND cs.stat_time < $2 AT TIME ZONE 'UTC'
            ${customerIds !== undefined ? "AND cs.customer_id = ANY ($3)" : ""}
            ORDER BY cs.customer_id, cs.stat_time;`;

        let queryParams: any[] = [afterTime.toISOString(), beforeTime.toISOString()];
        if(customerIds !== undefined)
            queryParams.push(customerIds);

        return new Promise((resolve: (value: Array<CustomerBacklogHistory>) => void, reject: (reason?: Error) => void) =>
        {

            this.pgPool.query(query, queryParams)
                .then((queryResult: pg.QueryResult) =>
                {
                    let result = new Array<CustomerBacklogHistory>();

                    queryResult.rows.forEach((row: any) =>
                    {
                        result.push(new CustomerBacklogHistory(row.customer_id, row.customer_name, moment(row.stat_time).toDate(), row.backlog))
                    });

                    resolve(result);
                },
                (reason: Error) => reject(reason));
        });

        /*
        using (var db = ConnectionCache.Performance.Database)
                {
                    var querySql = "SELECT cs.stat_time, cs.customer_id, c.name AS customer_name, cs.backlog " +
                                  $"FROM {Tbl.CustomerStats} AS cs " +
                                  $"JOIN {Tbl.Customers} AS c ON c.id = cs.customer_id " +
                                  $"WHERE cs.stat_time > '{queryModel.AfterTime.ToUniversalTime():yyyy-MM-ddTHH:mm:ssZ}' AT TIME ZONE 'UTC' " +
                                  $"AND cs.stat_time < '{queryModel.BeforeTime.ToUniversalTime():yyyy-MM-ddTHH:mm:ssZ}' AT TIME ZONE 'UTC' " +
                                   (queryModel.CustomerIds == null || !queryModel.CustomerIds.Any() 
                                        ? "" 
                                        : $"AND customer_id IN ({queryModel.CustomerIds.Select(cid => cid.ToString()).Aggregate((cur, nxt) => string.Concat(cur, ",", nxt))}) ") + 
                                   "ORDER BY cs.customer_id, cs.stat_time";


                    var rows = db.ExecuteReader(querySql);
                    
                    var currentCustomerId = -1;
                    var customerTotalBacklog = 0;
                    var customerResult = new List<CustomerBacklogHistoryModel>();

                    foreach(var row in rows)
                    {
                        var customerId = row.ToInt32("customer_id");
                        if(customerId != currentCustomerId)
                        {
                            // Add the customer to the returned results only if it has backlog results > 0
                            if(customerTotalBacklog > 0)
                            {
                                result.AddRange(customerResult);
                            }
                            customerTotalBacklog = 0;
                            customerResult = new List<CustomerBacklogHistoryModel>();
                        }

                        currentCustomerId = customerId;
                        var customerBacklog = new CustomerBacklogHistoryModel
                        {
                            CustomerId = customerId,
                            CustomerName = row.ToString("customer_name"),
                            StatTime = row.ToDate("stat_time"),
                            Backlog = row.ToInt32("backlog")
                        };
                        customerResult.Add(customerBacklog);
                        customerTotalBacklog += customerBacklog.Backlog;
                    }
                }
        */
    }

}

/*
let db = new PerformanceDb();

db.getBacklog().then(
    (value: Array<CustomerBacklog>) => console.log(JSON.stringify(value)),
    (reason: Error) => console.error(reason.message));

db.getCounters().then(
    (value: Counter) => console.log(JSON.stringify(value)),
    (reason: Error) => console.error(reason.message));
*/
