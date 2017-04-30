import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../Services";

@Component({
    moduleId: module.id,
    selector: "second-page",
    templateUrl: "./SecondPage.html",
    styleUrls: ["./SecondPage.css"],
    host: { class: "view" }
})
 
export class SecondPage
{
    protected loadTime: Date;

    constructor(protected appSettings: AppSettings)
    {
        this.loadTime = moment().toDate();
    }
}
