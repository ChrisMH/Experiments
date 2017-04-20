import * as angular from "angular";
import * as moment from "moment";

import { AppSettings } from "../Services";

import "./FirstPage.css";

export class FirstPage implements angular.IController
{
    protected loadTime: Date;

    static $inject = ["appSettings"];

    constructor(protected appSettings: AppSettings)
    {
        this.loadTime = moment().toDate();
    }
}
