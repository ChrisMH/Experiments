import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ChartModule } from '@progress/kendo-angular-charts';
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { IntlModule } from "@progress/kendo-angular-intl";

import { App } from "./App";
import { Router } from "./Router";
import { KendoDatePickerPage, PieChartPage } from "./Components";
import { AppSettings } from "./Services";

@NgModule({
    imports:
    [
        BrowserModule,
        BrowserAnimationsModule,

        ChartModule,
        DateInputsModule,
        IntlModule,

        Router
    ],

    declarations:
    [
        App,
        KendoDatePickerPage,
        PieChartPage
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
