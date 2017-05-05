import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../services";

@Component({
    selector: "first-page",
    templateUrl: "FirstPage.html",
    styleUrls: ["FirstPage.styl"],
    host: { class: "view" }
})

export class FirstPage
{
    protected loadTime: Date;

    constructor(protected appSettings: AppSettings)
    {
        this.loadTime = moment().toDate();
    }
}
   