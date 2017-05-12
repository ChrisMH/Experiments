import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ChartModule } from '@progress/kendo-angular-charts';
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { GridModule } from "@progress/kendo-angular-grid";
import { IntlModule } from "@progress/kendo-angular-intl";
import { DropDownListModule } from "@progress/kendo-angular-dropdowns";

import { ROUTER_IMPORTS, ROUTER_PROVIDERS } from "./AppRouter";
import { App } from "./App";
import {  DatePickerPage, DonutChartPage, DropDownsPage, GridPage, LineChartPage,
          LoadingIndicator } from "./components";
import { AppSettings } from "./services";

@NgModule({
    imports:
    [
        // Angular
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,

        // Kendo
        ChartModule,
        DateInputsModule,
        DropDownListModule,
        GridModule,
        IntlModule,

        // Application
        ROUTER_IMPORTS
    ],

    declarations:
    [
        App,
        LoadingIndicator,
        DatePickerPage,
        DonutChartPage,
        DropDownsPage,
        GridPage, 
        LineChartPage
    ],

    providers:
    [
        { provide: "ConfigRoot", useValue: window },
        AppSettings,
        ROUTER_PROVIDERS
    ],

    exports: [App],
    bootstrap: [App]
})
export class AppModule { }
