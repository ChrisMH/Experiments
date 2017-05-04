import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { StoreModule } from "@ngrx/store";
import { RouterStoreModule } from "@ngrx/router-store";

import { AppRouterModule } from "./AppRouterModule";
import { AppStoreModule } from "./Store";
import { App, Backlog, CustomerBlock, ServerBlock, Login } from "./Components";
import { AppSettings, OvHealthService } from "./Services";

@NgModule({
    imports:
    [
        BrowserModule, BrowserAnimationsModule,
        ReactiveFormsModule,

        AppStoreModule,     
        AppRouterModule
    ],

    declarations:
    [
        App, 

        Backlog, CustomerBlock, ServerBlock,
        
        Login        
    ],

    providers:
    [
        { provide: "ConfigRoot", useValue: window },
        AppSettings,        
        OvHealthService
    ],

    exports: [App],
    bootstrap: [App]
})
export class Module { }
