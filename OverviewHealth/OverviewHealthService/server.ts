import * as express from "express";
import * as fs from "fs";
import * as moment from "moment";

//import * as http from "http";
//import * as timers from "timers";

import { BacklogHistory, Counters, Customer, CustomerBacklog, PerformanceDb } from "./db";


if (process.env.node_env === undefined)
    throw "node_env is not defined";


let app = express();
let port = process.env.port || 1337;


class ServiceResponse
{
    dataTime: Date;

    constructor(
        public success: boolean,
        public message: string,
        public data?: Object)
    {
        this.dataTime = moment().toDate();
    }
}

const cacheTime = 60;

let performanceDb = new PerformanceDb();

let lastBacklogTime: moment.Moment = undefined;
let backlog: string = undefined;

let lastCountersTime: moment.Moment = undefined;
let counters: string = undefined;


app.get(`${getVirtualDir()}/customers`, (req: express.Request, res: express.Response) =>
{    
    performanceDb.getCustomers()
        .then((value: Array<Customer>) =>
            {
                sendResponse(res, JSON.stringify(new ServiceResponse(true, undefined, value)));
            },
            (reason: Error) =>
            {
                sendResponse(res, JSON.stringify(new ServiceResponse(false, reason.message)));
            });
});


app.get(`${getVirtualDir()}/backlog`, (req: express.Request, res: express.Response) =>
{    
    let now = moment();
    if (lastBacklogTime && backlog && now.diff(lastBacklogTime, "seconds") < cacheTime)
    {
        console.log("Replying with existing backlog");
        sendResponse(res, backlog);
    }
    else
    {
        performanceDb.getBacklog()
            .then((value: Array<CustomerBacklog>) =>
                {
                    backlog = JSON.stringify(new ServiceResponse(true, undefined, value));
                    lastBacklogTime = moment();
                    console.log("Replying with new backlog");
                    sendResponse(res, backlog);
                },
                (reason: Error) =>
                {
                    backlog = JSON.stringify(new ServiceResponse(false, reason.message));
                    console.error("Error", reason.message);
                    sendResponse(res, backlog);
                });
    }
});


app.get(`${getVirtualDir()}/counters`, (req: express.Request, res: express.Response) =>
{
    let now = moment();
    if (lastCountersTime && counters && now.diff(lastCountersTime, "seconds") < cacheTime)
    {
        console.log("Replying with existing counters");
        sendResponse(res, counters);
    }
    else
    {
        performanceDb.getCounters()
            .then((value: Counters) =>
                {
                    counters = JSON.stringify(new ServiceResponse(true, undefined, value));
                    lastCountersTime = moment();
                    console.log("Replying with new counters");
                    sendResponse(res, counters);
                },
                (reason: Error) =>
                {
                    counters = JSON.stringify(new ServiceResponse(false, reason.message));
                    console.error("Error", reason.message);
                    sendResponse(res, counters);
                });
    }
});


app.get(`${getVirtualDir()}/history/backlog`, (req: express.Request, res: express.Response) =>
{  
    if(!req.query.hasOwnProperty("afterTime") || !req.query.hasOwnProperty("beforeTime"))
    {
        res.sendStatus(400);
        throw(new Error("Missing URL Parameter"));
    }

    performanceDb.getBacklogHistory(moment(req.query.afterTime), moment(req.query.beforeTime))
        .then((value: BacklogHistory[]) =>
        {
            let response = JSON.stringify(new ServiceResponse(true, undefined, value));
            sendResponse(res, response);            
        },
        (reason: any) =>
        {
            let response = JSON.stringify(new ServiceResponse(false, reason.message));
            console.error("Error", reason.message);
            sendResponse(res, response);
        });
});


app.get(`${getVirtualDir()}/history/customerbacklog`, (req: express.Request, res: express.Response) =>
{      
    if(!req.query.hasOwnProperty("afterTime") || !req.query.hasOwnProperty("beforeTime"))
    {
        res.sendStatus(400);
        throw(new Error("Missing URL Parameter"));
    }

    let customerIds: number[] = undefined;
    if(req.query.hasOwnProperty("customerIds"))
    {
        customerIds = [];
        req.query["customerIds"].split(",").forEach((elem: string) => {
            let val = parseInt(elem);
            if(isNaN(val))
            {
                res.sendStatus(400);
                throw(new Error("Invalid URL Parameter"));
            }
            customerIds.push(val);
        });
    }

    performanceDb.getCustomerBacklogHistory(moment(req.query.afterTime), moment(req.query.beforeTime), customerIds)
        .then((value: BacklogHistory[]) =>
        {
            let response = JSON.stringify(new ServiceResponse(true, undefined, value));
            sendResponse(res, response);            
        },
        (reason: any) =>
        {
            let response = JSON.stringify(new ServiceResponse(false, reason.message));
            console.error("Error", reason.message);
            sendResponse(res, response);
        });
});


app.listen(port, () =>
{     
    console.log(`Listening on port ${port}: ${process.env.node_env}, v${getVersion()}, vDir: ${getVirtualDir() ? getVirtualDir() : "<None>"}`);
}); 



function sendResponse(res: express.Response, data: string): void
{
    res.writeHead(200,
    {
        "Content-Type": "text/json",
        "Cache-Conrol": "private, no-cache, no-store, must-revalidate",
        "Expires": "-1",
        "Pragma": "no-cache"
    });
    res.end(data);
}


function getVersion(): string
{
    var packageFile = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    return packageFile["version"];
}

function getVirtualDir(): string
{
    if(process.env.hasOwnProperty("virtual_dir") && process.env.virtual_dir !== undefined)
        return `/${process.env.virtual_dir}`
    return "";
}