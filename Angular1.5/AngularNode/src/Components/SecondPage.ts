import * as angular from "angular";
import * as moment from "moment";

import { AppSettings } from "../Services";

import "./SecondPage.css";

export class SecondPage implements angular.IController
{
    protected loadTime: Date;

    static $inject = ["appSettings"];

    constructor(protected appSettings: AppSettings)
    {
        this.loadTime = moment().toDate();
    }
}
