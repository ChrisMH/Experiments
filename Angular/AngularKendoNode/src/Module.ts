import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ChartModule } from '@progress/kendo-angular-charts';
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { IntlModule } from "@progress/kendo-angular-intl";
import { DropDownListModule } from "@progress/kendo-angular-dropdowns";

import { App } from "./App";
import { Router } from "./Router";
import { DatePickerPage, DropDownsPage, PieChartPage } from "./Components";
import { AppSettings } from "./Services";

@NgModule({
    imports:
    [
        // Angular
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,

        // Kendo
        ChartModule,
        DateInputsModule,
        DropDownListModule,
        IntlModule,

        // Application
        Router
    ],

    declarations:
    [
        App,
        DatePickerPage,
        DropDownsPage,
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
