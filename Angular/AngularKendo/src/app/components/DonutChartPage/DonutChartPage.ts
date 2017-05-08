import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { AppSettings } from "../../services";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/map";

@Component({
    selector: "donut-chart-page",
    templateUrl: "DonutChartPage.html",
    styleUrls: ["DonutChartPage.styl"],
    host: { class: "view" }
})
 
export class DonutChartPage
{
    protected isLoading = true;

    protected chartData: Observable<Object[]>;
    constructor(protected appSettings: AppSettings)
    {
        const url = `${this.appSettings.service}backlog`
        this.chartData = Observable.ajax.getJSON(url)
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

    private onRender()
    {
        this.isLoading = false;
    }
}
