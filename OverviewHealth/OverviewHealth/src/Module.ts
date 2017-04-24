import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CookieModule } from "ngx-cookie";

import { App } from "./App";
import { Router } from "./Router";
import { Backlog, ServerBlock, Login, OvHeader } from "./Components";
import { AppSettings, OvCookieService, OvHealthService } from "./Services";

@NgModule({
    imports:
    [
        BrowserModule,
        CookieModule,
        Router
    ],

    declarations:
    [
        App,
        Backlog, ServerBlock,
        Login,
        OvHeader
    ],

    providers:
    [
        { provide: "ConfigRoot", useValue: window },
        AppSettings,
        OvCookieService,
        OvHealthService
    ],

    exports: [App],
    bootstrap: [App]
})
export class Module { }
