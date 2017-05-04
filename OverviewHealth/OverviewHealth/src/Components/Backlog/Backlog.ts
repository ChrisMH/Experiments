import { Component } from "@angular/core";
import * as moment from "moment";
import { TypedJSON } from "typedjson-npm";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/observable/timer";
import "rxjs/add/observable/empty";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/timeout";
import "rxjs/add/operator/take";

import { Counters, CustomerBacklog, CustomerCounter, TrackerBacklog } from "../../Models";
import { AppSettings, HealthServer } from "../../Services";

@Component({
    moduleId: module.id,
    selector: "backlog",
    templateUrl: "./Backlog.html",
    styleUrls: ["./Backlog.css"],
    host: { class: "view" }
})

export class Backlog
{
    protected servers = new Array<Server>();

    protected subscriptions = new Array<Subscription>();


    constructor(protected appSettings: AppSettings)
    {
        this.appSettings.healthServers.forEach((hs: HealthServer) => this.servers.push(new Server(hs.serverName, hs.serverUrl)));
    }

    ngOnInit(): void
    {
        this.servers.forEach((s: Server) =>
        {
            const backlogAjax$ = Observable.ajax.getJSON(`${s.url}backlog`)
                                .map((value: Object[]) =>
                                {
                                    let result = new Array<CustomerBacklog>();
                                    value.forEach((i: Object) => result.push(TypedJSON.parse(TypedJSON.stringify(i), CustomerBacklog)));
                                    return result;
                                })
                                .catch(() => Observable.empty())
                                .finally(() => s.isLoading--);

            const countersAjax$ = Observable.ajax.getJSON(`${s.url}counters`)
                                .map((value: Object) => TypedJSON.parse(TypedJSON.stringify(value), Counters))
                                .catch(() => Observable.empty())
                                .finally(() => s.isLoading--);
            
            this.subscriptions.push(
                Observable
                    .timer(0, this.appSettings.updateInterval)
                    .do(() => s.isLoading++)
                    .switchMap(() => backlogAjax$)
                    .subscribe((customerBacklog: Array<CustomerBacklog>) => this.mergeBacklog(s, customerBacklog))
            );

            this.subscriptions.push(
                Observable
                    .timer(0, this.appSettings.updateInterval)
                    .do(() => s.isLoading++)
                    .switchMap(() => countersAjax$)
                    .subscribe((counters: Counters) => this.mergeCounters(s, counters))
            );

        });
    }

    ngOnDestroy(): void
    {
        this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
    }

    protected onServerHistory(e: any, serverIndex: any): void
    {
        console.log(`onHistory(${serverIndex})`);
    }

    protected onServerExpand(e: any, serverIndex: any): void
    {
        console.log(`onExpand(${serverIndex})`);

        if(this.servers[serverIndex].showCustomerBacklog)
            this.servers[serverIndex].showCustomerBacklog = false;
        else
            this.servers.forEach((s: Server, i: number) => this.servers[i].showCustomerBacklog = (i === serverIndex));
    }

    private mergeBacklog(server: Server, customerBacklog: Array<CustomerBacklog>): void
    {
        server.backlog = 0;
        server.totalReceived = 0;
        server.lastReceivedOn = moment().year(2000).toDate();
        
        customerBacklog.forEach((cb: CustomerBacklog) =>
        {
            server.backlog += cb.backlog;
            server.totalReceived += cb.totalReceived;
            if(moment(cb.lastReceivedOn).isAfter(server.lastReceivedOn)) server.lastReceivedOn = cb.lastReceivedOn;
        });

        this.mergeCustomerBacklog(server, customerBacklog);

    }

    private mergeCustomerBacklog(server: Server, customerBacklog: Array<CustomerBacklog>): void
    {
        server.customers.forEach((cs: Customer) => cs.mergeTouched = false);

        customerBacklog.forEach((cb: CustomerBacklog) =>
        {
            let customer = server.customers.find((c: Customer) => c.name === cb.customerName);
            if(!customer)
            {
                customer = new Customer(cb.customerName);
                server.customers.push(customer);
            }
            
            customer.backlog = cb.backlog;
            customer.totalReceived = cb.totalReceived;
            customer.lastReceivedOn = cb.lastReceivedOn;
            customer.mergeTouched = true;
        });

        let i = 0;
        while(i < server.customers.length)
        {
            if(!server.customers[i].mergeTouched)
                server.customers.splice(i, 1);
            else
                i++;
        }

        server.customers = server.customers.sort(this.sortCustomeStateItem);
    }


    private mergeCounters(server: Server, counters: Counters)
    {
        server.pctProcessorTime = counters.pctProcessorTime;
        server.availableMBytes = counters.availableMBytes;
        server.pctPagingFileUsage = counters.pctPagingFileUsage;
        server.databaseConnections = counters.databaseConnections;
        server.idleDatabaseConnections = counters.idleDatabaseConnections;
    }

    private sortCustomeStateItem(a: Customer, b: Customer): number
    {
        if(a.backlog < b.backlog) return -1;
        if(a.backlog > b.backlog) return 1;
        return 0;
    }

}


export class Server
{
    backlog = 0;
    totalReceived = 0;
    lastReceivedOn = moment().year(2000).toDate();
    pctProcessorTime = 0;
    availableMBytes = 0;
    pctPagingFileUsage = 0;
    databaseConnections = 0;
    idleDatabaseConnections = 0;
    customers = new Array<Customer>();

    isLoading = 0;
    showCustomerBacklog = false;

    constructor(public name: string, public url: string) {}
}

export class Customer
{
    backlog = 0;
    totalReceived = 0;
    lastReceivedOn = moment().year(2000).toDate();
    pctProcessorTime = 0;
    availableMBytes = 0;
    pctPagingFileUsage = 0;
    databaseConnections = 0;
    idleDatabaseConnections = 0;

    mergeTouched = true;
    
    constructor(public name: string) {}

}
