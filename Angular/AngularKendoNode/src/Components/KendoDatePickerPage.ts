import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings } from "../Services";

@Component({
    moduleId: module.id,
    selector: "date-picker-page",
    //template: template,
    //styles: styles
    templateUrl: "./KendoDatePickerPage.html",
    styleUrls: ["./KendoDatePickerPage.css"]
})

export class KendoDatePickerPage
{
    public value: Date = moment().toDate();
}
   