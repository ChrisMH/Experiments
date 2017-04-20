import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../Services";

import "./FirstPage.css";
let template = require("./FirstPage.html");

@Component({
    //moduleId: module.id,
    selector: "first-page",
    template: template
})

export class FirstPage
{
    protected loadTime: Date;

    constructor(protected appSettings: AppSettings)
    {
        this.loadTime = moment().toDate();
    }
}
