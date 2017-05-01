import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieModule } from "ngx-cookie";

import { StoreModule } from "@ngrx/store";
import { RouterStoreModule } from "@ngrx/router-store";

import { Router } from "./Router";
import { AppStore } from "./Store";
import { App, AppHeader, Backlog, ServerBlock, Login } from "./Components";
import { AppSettings, OvCookieService, OvHealthService, OvPrincipalService } from "./Services";

@NgModule({
    imports:
    [
        BrowserModule, BrowserAnimationsModule,
        ReactiveFormsModule,

        AppStore,     
        Router,

        CookieModule.forRoot()
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
