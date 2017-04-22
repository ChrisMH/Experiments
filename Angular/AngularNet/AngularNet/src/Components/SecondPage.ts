import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../Services";

//const styles = [require("./SecondPage.css").toString()];
//const template = require("./SecondPage.html");

@Component({
    moduleId: module.id,
    selector: "second-page",
    templateUrl: "./SecondPage.html",
    styleUrls: ["./SecondPage.css"]
    //template: template,
    //styles: [styles]
})
 
export class SecondPage
{
    protected loadTime: Date;

    constructor(protected appSettings: AppSettings)
    {
        this.loadTime = moment().toDate();
    }
}
