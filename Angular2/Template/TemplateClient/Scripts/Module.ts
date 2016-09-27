import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import * as c from "./components";
import * as s from "./services";

@NgModule({
    imports: [
        BrowserModule
    ],

    declarations: [ 
        c.App
    ],

    providers: [
        s.AppSettings
    ],

    exports: [c.App],
    bootstrap: [c.App]
})
export class Module { }
