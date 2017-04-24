import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../../Services";

@Component({
    moduleId: module.id,
    selector: "backlog",
    templateUrl: "./Backlog.html",
    styleUrls: ["./Backlog.css"],
    host: { class: "view" }
})

export class Backlog
{
    protected loadTime: Date;

    constructor(protected appSettings: AppSettings)
    {
        this.loadTime = moment().toDate();
    }
}
   