import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../Services";

@Component({
    moduleId: module.id,
    selector: "date-picker-page",
    templateUrl: "./DatePickerPage.html",
    styleUrls: ["./DatePickerPage.css"],
    host: { class: "view" }
})

export class KendoDatePickerPage
{
    public value: Date = moment().toDate();
}
   