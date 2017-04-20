import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { App } from "./App";
import { FirstPage } from "./Components";
import { AppSettings } from "./Services";

@NgModule({
    imports:
    [
        BrowserModule
    ],

    declarations:
    [
        App,
        FirstPage
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
