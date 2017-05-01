import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CookieModule } from "ngx-cookie";

import { Router } from "./Router";
import { App, AppHeader, Backlog, ServerBlock, Login } from "./Components";
import { AppSettings, OvCookieService, OvHealthService, OvPrincipalService } from "./Services";

@NgModule({
    imports:
    [
        BrowserModule,
        CookieModule,
        Router
    ],

    declarations:
    [
        App, AppHeader,

        Backlog, ServerBlock,
        
        Login        
    ],

    providers:
    [
        { provide: "ConfigRoot", useValue: window },
        AppSettings,
        OvCookieService,
        OvHealthService,
        OvPrincipalService
    ],

    exports: [App],
    bootstrap: [App]
})
export class Module { }
