import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { DatepickerModule } from "ng2-bootstrap/ng2-bootstrap";

import * as comp from "./Components";
import * as serv from "./Services";

@NgModule({
    imports: [
        BrowserModule,
        ButtonsModule,
        DatepickerModule,
        FormsModule
    ],

    declarations: [ 
        comp.App,
        comp.DatepickerPopup
    ],

    providers: [
        serv.AppSettings
    ],

    exports: [comp.App],
    bootstrap: [comp.App]
})
export class Module { }
