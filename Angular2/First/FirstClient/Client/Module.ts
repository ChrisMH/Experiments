import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { App } from "./Components/App";
import { PageConfig } from "./Providers/PageConfig";

@NgModule({
    imports: [
        BrowserModule
    ],

    declarations: [
        App
    ],

    providers: [
        PageConfig
    ],

    exports: [App],
    bootstrap: [App]
})
export class Module { }
