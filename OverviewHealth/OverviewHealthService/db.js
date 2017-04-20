"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg = require("pg");
const moment = require("moment");
class CustomerBacklog {
    constructor(customerId, customerName, statTime, backlog, lastReceivedOn, totalReceived) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.statTime = statTime;
        this.backlog = backlog;
        this.lastReceivedOn = lastReceivedOn;
        this.totalReceived = totalReceived;
        this.trackerBacklog = new Array();
    }
}
exports.CustomerBacklog = CustomerBacklog;
class TrackerBacklog {
    constructor(trackerId, trackerName, assetName, statTime, backlog, lastReceivedOn, totalReceived) {
        this.trackerId = trackerId;
        this.trackerName = trackerName;
        this.assetName = assetName;
        this.statTime = statTime;
        this.backlog = backlog;
        this.lastReceivedOn = lastReceivedOn;
        this.totalReceived = totalReceived;
    }
}
exports.TrackerBacklog = TrackerBacklog;
class Counters {
    constructor(statTime, pctProcessorTime, availableMBytes, pctPagingFileUsage, databaseConnections, idleDatabaseConnections) {
        this.statTime = statTime;
        this.pctProcessorTime = pctProcessorTime;
        this.availableMBytes = availableMBytes;
        this.pctPagingFileUsage = pctPagingFileUsage;
        this.databaseConnections = databaseConnections;
        this.idleDatabaseConnections = idleDatabaseConnections;
        this.customerCounters = new Array();
    }
}
exports.Counters = Counters;
class CustomerCounter {
    constructor(customerId, customerName, databaseConnections, idleDatabaseConnections) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.databaseConnections = databaseConnections;
        this.idleDatabaseConnections = idleDatabaseConnections;
    }
}
exports.CustomerCounter = CustomerCounter;
class Customer {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
exports.Customer = Customer;
class BacklogHistory {
    constructor(statTime, backlog) {
        this.statTime = statTime;
        this.backlog = backlog;
    }
    toJSON() {
        return {
            "t": this.statTime.toISOString(),
            "b": this.backlog
        };
    }
}
exports.BacklogHistory = BacklogHistory;
class CustomerBacklogHistory {
    constructor(customerId, customerName, statTime, backlog) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.statTime = statTime;
        this.backlog = backlog;
    }
    toJSON() {
        return {
            "i": this.customerId,
            "n": this.customerName,
            "t": this.statTime.toISOString(),
            "b": this.backlog
        };
    }
}
exports.CustomerBacklogHistory = CustomerBacklogHistory;
class PerformanceDb {
    constructor() {
        let connection = {
            host: "odb.logikos.com",
            port: 21000,
            database: "performance",
            user: "performanceuser",
            password: "performance0817",
            max: 2,
            idleTimeoutMillis: 30000
        };
        this.pgPool = new pg.Pool(connection);
        this.pgPool.on("error", (err, client) => {
            console.error("Idle client error", err.message, err.stack);
        });
    }
    getCustomers() {
        let query = "SELECT c.id, c.name \
                     FROM customers AS c \
                     WHERE c.active IS TRUE \
                     ORDER BY c.name;";
        return new Promise((resolve, reject) => {
            this.pgPool.query(query)
                .then((queryResult) => {
                let result = new Array();
                queryResult.rows.forEach((row) => {
                    result.push(new Customer(row.id, row.name));
                });
                resolve(result);
            }, (reason) => reject(reason));
        });
    }
    getBacklog() {
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
        return new Promise((resolve, reject) => {
            this.pgPool.query(query, undefined)
                .then((queryResult) => {
                let result = new Array();
                queryResult.rows.forEach((row) => {
                    if (result.length === 0 || result[result.length - 1].customerId !== row.customer_id) {
                        let customerBacklog = new CustomerBacklog(row.customer_id, row.customer_name, moment(row.customer_stat_time).toDate(), row.customer_backlog, moment(row.customer_last_received_on).toDate(), row.customer_total_received);
                        result.push(customerBacklog);
                    }
                    if (!row.tracker_id)
                        return;
                    let trackerBacklog = new TrackerBacklog(row.tracker_id, row.tracker_name, row.asset_name, moment(row.tracker_stat_time).toDate(), row.tracker_backlog, moment(row.tracker_last_received_on).toDate(), row.tracker_total_received);
                    result[result.length - 1].trackerBacklog.push(trackerBacklog);
                });
                resolve(result);
            }, (reason) => {
                reject(reason);
            });
        });
    }
    getCounters() {
        let query = "SELECT cnt.stat_time, cnt.pct_processor_time, cnt.available_m_bytes, cnt.pct_paging_file_usage, \
                            cnt.database_connections, cnt.idle_database_connections, \
                            cc.customer_id, c.name AS customer_name, \
                            cc.database_connections AS customer_database_connections, cc.idle_database_connections AS customer_idle_database_connections \
                     FROM global_counter AS gc \
                     JOIN counters AS cnt ON cnt.id = gc.counter_id \
                     JOIN customer_counters AS cc ON cc.counter_id = gc.counter_id \
                     JOIN customers AS c ON c.id = cc.customer_id \
                     WHERE c.active IS TRUE ";
        return new Promise((resolve, reject) => {
            this.pgPool.query(query, undefined)
                .then((queryResult) => {
                let result = undefined;
                queryResult.rows.forEach((row) => {
                    if (result === undefined) {
                        result = new Counters(moment(row.stat_time).toDate(), row.pct_processor_time, row.available_m_bytes, row.pct_paging_file_usage, row.database_connections, row.idle_database_connections);
                    }
                    let customerCounter = new CustomerCounter(row.customer_id, row.customer_name, row.customer_database_connections, row.customer_idle_database_connections);
                    result.customerCounters.push(customerCounter);
                });
                resolve(result);
            }, (reason) => reject(reason));
        });
    }
    getBacklogHistory(afterTime, beforeTime) {
        let query = "SELECT cs.stat_time, SUM(cs.backlog)::integer AS backlog  \
            FROM customer_stats AS cs \
            JOIN customers AS c on c.id = cs.customer_id \
            WHERE c.active IS TRUE \
            AND cs.stat_time > $1 AT TIME ZONE 'UTC' \
            AND cs.stat_time < $2 AT TIME ZONE 'UTC' \
            GROUP BY cs.stat_time \
            ORDER BY cs.stat_time;";
        return new Promise((resolve, reject) => {
            this.pgPool.query(query, [afterTime.toISOString(), beforeTime.toISOString()])
                .then((queryResult) => {
                let result = new Array();
                queryResult.rows.forEach((row) => {
                    result.push(new BacklogHistory(moment(row.stat_time).toDate(), row.backlog));
                });
                resolve(result);
            }, (reason) => reject(reason));
        });
    }
    getCustomerBacklogHistory(afterTime, beforeTime, customerIds) {
        let query = `SELECT cs.stat_time, cs.customer_id, c.name AS customer_name, cs.backlog 
            FROM customer_stats AS cs
            JOIN customers AS c ON c.id = cs.customer_id
            WHERE cs.stat_time > $1 AT TIME ZONE 'UTC'
            AND cs.stat_time < $2 AT TIME ZONE 'UTC'
            ${customerIds !== undefined ? "AND cs.customer_id = ANY ($3)" : ""}
            ORDER BY cs.customer_id, cs.stat_time;`;
        let queryParams = [afterTime.toISOString(), beforeTime.toISOString()];
        if (customerIds !== undefined)
            queryParams.push(customerIds);
        return new Promise((resolve, reject) => {
            this.pgPool.query(query, queryParams)
                .then((queryResult) => {
                let result = new Array();
                queryResult.rows.forEach((row) => {
                    result.push(new CustomerBacklogHistory(row.customer_id, row.customer_name, moment(row.stat_time).toDate(), row.backlog));
                });
                resolve(result);
            }, (reason) => reject(reason));
        });
    }
}
exports.PerformanceDb = PerformanceDb;
//# sourceMappingURL=db.js.map