

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { App } from "./Components/App";
import { PageConfigProvider } from "./Providers/PageConfig";

@NgModule({
    imports: [
        BrowserModule
    ],

    declarations: [
        App
    ],

    providers: [
        PageConfigProvider
    ],

    exports: [App],
    bootstrap: [App]
})
export class Module { }
