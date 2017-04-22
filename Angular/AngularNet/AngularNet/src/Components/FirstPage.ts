import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../Services";

//const template = require("./FirstPage.html");
//const styles = [require("./FirstPage.css").toString()];

@Component({
    moduleId: module.id,
    selector: "first-page",
    //template: template,
    //styles: styles
    templateUrl: "./FirstPage.html",
    styleUrls: ["./FirstPage.css"]
})

export class FirstPage
{
    protected loadTime: Date;

    constructor(protected appSettings: AppSettings)
    {
        this.loadTime = moment().toDate();
    }
}
   