import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../Services";

@Component({
    moduleId: module.id,
    selector: "first-page",
    templateUrl: "./FirstPage.html",
    styleUrls: ["./FirstPage.css"],
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
   