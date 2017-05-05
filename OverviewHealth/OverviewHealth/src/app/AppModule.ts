import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ROUTER_IMPORTS, ROUTER_PROVIDERS } from "./AppRouter";
import { STORE_IMPORTS } from "./store/AppStore";

import { App } from "./App";
import { Backlog, CustomerBlock, ServerBlock, Login } from "./components";
import { AppSettings } from "./services";

@NgModule({
    imports:
    [
        BrowserModule, BrowserAnimationsModule,
        ReactiveFormsModule,
     
        ROUTER_IMPORTS,
        STORE_IMPORTS   
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
        ROUTER_PROVIDERS
    ],

    exports: [App],
    bootstrap: [App]
})
export class AppModule { }
