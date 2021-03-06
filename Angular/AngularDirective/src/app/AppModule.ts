import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule }  from "@angular/platform-browser";

import { App } from "./App";
import { ROUTER_IMPORTS, ROUTER_PROVIDERS } from "./AppRouter";
import { FirstPage, SecondPage } from "./components";
import { DIRECTIVE_DECLARATIONS } from "./directives";
import { AppSettings } from "./services";

@NgModule({
    imports: [
        BrowserModule, FlexLayoutModule,

        ROUTER_IMPORTS
    ],
    declarations: [
        App, FirstPage, SecondPage,
        DIRECTIVE_DECLARATIONS
    ],
    providers: [
        { provide: "ConfigRoot", useValue: window },
        AppSettings,

        ROUTER_PROVIDERS
    ],
    bootstrap: [ App ]
})
export class AppModule { }
