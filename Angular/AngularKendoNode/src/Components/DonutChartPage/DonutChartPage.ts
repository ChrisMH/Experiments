import { Component } from "@angular/core";
import * as Rx from "rxjs";

import { AppSettings } from "../../Services";

@Component({
    moduleId: module.id,
    selector: "donut-chart-page",
    templateUrl: "./DonutChartPage.html",
    styleUrls: ["./DonutChartPage.css"],
    host: { class: "view" }
})
 
export class DonutChartPage
{
    protected chartData: Rx.Observable<Object[]>;
    constructor(protected appSettings: AppSettings)
    {
        const url = `${this.appSettings.service}backlog`
        this.chartData = Rx.Observable.ajax.getJSON(url)
            .map((value: Object) =>
            {
                let result = value as Array<Object>;
                return result.sort((a: Object, b: Object) => 
                {
                    if(parseInt(a["totalReceived"]) < parseInt(b["totalReceived"]))
                        return 1;
                    
                    if(parseInt(a["totalReceived"]) > parseInt(b["totalReceived"]))
                        return -1;

                    return 0;                    
                }).splice(0, 10);
            })
            .catch((err: any) =>
            {
                console.error(err);
                throw new Error(err);
            });

        // this.chartData.subscribe((value: Object[]) =>
        // {
        //     console.log("Got Data");
        // })
    }

    ngOnInit(): void
    {

    }
}
