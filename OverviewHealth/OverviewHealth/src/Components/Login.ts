import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../Services";

@Component({
    moduleId: module.id,
    selector: "login",
    templateUrl: "./Login.html",
    styleUrls: ["./Login.css"],
    host: { class: "view" }
})
 
export class Login
{
    protected loadTime: Date;

    constructor(protected appSettings: AppSettings)
    {
        this.loadTime = moment().toDate();
    }
}
