import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../Services";

@Component({
    moduleId: module.id,
    selector: "ov-header",
    templateUrl: "./OvHeader.html",
    styleUrls: ["./OvHeader.css"]
})
 
export class OvHeader
{
    constructor(protected appSettings: AppSettings)
    {
    }
}
