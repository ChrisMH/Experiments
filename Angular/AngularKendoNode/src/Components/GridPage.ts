import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../Services";

import { Observable } from "rxjs/Observable";
import { ajax } from "rxjs/observable/dom/ajax"
import { first } from "rxjs/operator/first";

@Component({
    moduleId: module.id,
    selector: "grid-page",
    templateUrl: "./GridPage.html",
    //styleUrls: ["./DatePickerPage.css"],
    host: { class: "view" }
})

export class GridPage
{    
    gridData: Observable<Array<{}>>; 
    
    constructor()
    {
        this.gridData = ajax.getJSON("http://localhost/OverviewHealthService/backlog")
                      .map((value: {}) => value["data"]);
    }
    //     {
    //         "customerId": 31,
    //         "customerName": "Super Restoration",
    //         "statTime": "2017-04-28T01:25:44.000Z",
    //         "backlog": 0,
    //         "lastReceivedOn": "2017-04-18T14:07:51.000Z",
    //         "totalReceived": 7598367
    //     },
    //     {
    //         "customerId": 7,
    //         "customerName": "Full Steam Ahead",
    //         "statTime": "2017-04-28T01:25:44.000Z",
    //         "backlog": 0,
    //         "lastReceivedOn": "2017-04-18T14:07:54.000Z",
    //         "totalReceived": 1612550
    //     },
    //     {
    //         "customerId": 42,
    //         "customerName": "Restoration Solutions",
    //         "statTime": "2017-04-28T01:25:44.000Z",
    //         "backlog": 0,
    //         "lastReceivedOn": "2017-04-18T13:54:38.000Z",
    //         "totalReceived": 438319
    //     },
    //     {
    //         "customerId": 30,
    //         "customerName": "Chicago Water & Fire",
    //         "statTime": "2017-04-28T01:25:44.000Z",
    //         "backlog": 0,
    //         "lastReceivedOn": "2017-04-18T14:07:54.000Z",
    //         "totalReceived": 15974109
    //     },
    //     {
    //         "customerId": 10,
    //         "customerName": "Dry More",
    //         "statTime": "2017-04-28T01:25:44.000Z",
    //         "backlog": 0,
    //         "lastReceivedOn": "2017-04-18T14:07:55.000Z",
    //         "totalReceived": 4542266
    //     },
    //     {
    //         "customerId": 500000,
    //         "customerName": "Graham Prewitt",
    //         "statTime": "2017-04-28T01:25:44.000Z",
    //         "backlog": 0,
    //         "lastReceivedOn": "2016-10-19T02:36:38.000Z",
    //         "totalReceived": 0
    //     }
    // ];
    
    // ngOnInit(): void
    // {
    //     let obs = ajax.getJSON("http://localhost/OverviewHealthService/backlog")
    //                   .map((value: {}) => value["data"])
        
    //     obs.subscribe((data: Array<{}>) => this.gridData = data);
    // }
}
