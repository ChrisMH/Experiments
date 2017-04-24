import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../Services";

@Component({
    moduleId: module.id,
    selector: "pie-chart-page",
    templateUrl: "./PieChartPage.html",
    styleUrls: ["./PieChartPage.css"],
    host: { class: "view" }
})
 
export class PieChartPage
{
    protected pieData: Object[] = [
        { category: "Eaten", value: 0.42 },
        { category: "Not eaten", value: 0.58 }
    ];

    constructor(protected appSettings: AppSettings)
    {
    }
}
