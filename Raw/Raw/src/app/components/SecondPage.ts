import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../services";

@Component({
    selector: "second-page",
    templateUrl: "SecondPage.html",
    styleUrls: ["SecondPage.styl"],
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
