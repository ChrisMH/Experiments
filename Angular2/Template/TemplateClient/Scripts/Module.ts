import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { App } from "./Components/App";
import { AppSettings } from "./Providers/AppSettings";

@NgModule({
    imports: [
        BrowserModule
    ],

    declarations: [
        App
    ],

    providers: [
        AppSettings
    ],

    exports: [App],
    bootstrap: [App]
})
export class Module { }
