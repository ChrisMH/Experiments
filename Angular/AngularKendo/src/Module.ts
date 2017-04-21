import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { IntlModule } from "@progress/kendo-angular-intl";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";

import { App } from "./App";
import { Router } from "./Router";
import { KendoDatePickerPage, SecondPage } from "./Components";
import { AppSettings } from "./Services";

@NgModule({
    imports:
    [
        BrowserModule,
        BrowserAnimationsModule,
        IntlModule,
        DateInputsModule,
        Router
    ],

    declarations:
    [
        App,
        KendoDatePickerPage,
        SecondPage
    ],

    providers:
    [
        { provide: "ConfigRoot", useValue: window },
        AppSettings
    ],

    exports: [App],
    bootstrap: [App]
})
export class Module { }
