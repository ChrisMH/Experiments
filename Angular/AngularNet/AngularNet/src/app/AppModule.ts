import { NgModule } from "@angular/core";
import { BrowserModule }  from "@angular/platform-browser";

import { AppRouterModule } from "./AppRouterModule";
import { App } from "./App";
import { FirstPage, SecondPage } from "./components";
import { AppSettings } from "./services";

@NgModule({
    imports: [
        BrowserModule,
        AppRouterModule
    ],
    declarations: [
      App, FirstPage, SecondPage
    ],
    providers: [
        { provide: "ConfigRoot", useValue: window },
        AppSettings
    ],
    bootstrap: [ App ]
})
export class AppModule { }
