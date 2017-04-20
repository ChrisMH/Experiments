import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { App } from "./App";
import { Router } from "./Router";
import { FirstPage, SecondPage } from "./Components";
import { AppSettings } from "./Services";

@NgModule({
    imports:
    [
        BrowserModule,
        Router
    ],

    declarations:
    [
        App,
        FirstPage,
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
