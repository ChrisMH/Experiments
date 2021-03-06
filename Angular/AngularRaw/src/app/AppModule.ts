import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule }  from "@angular/platform-browser";

import { App } from "./App";
import { ROUTER_IMPORTS, ROUTER_PROVIDERS } from "./AppRouter";
import { FirstPage, SecondPage } from "./components";
import { ServicesModule } from "./services";

@NgModule({
    imports: [
        BrowserModule, FlexLayoutModule,

        ServicesModule,
        ROUTER_IMPORTS
    ],
    declarations: [
        App, FirstPage, SecondPage
    ],
    providers: [
        ROUTER_PROVIDERS
    ],
    bootstrap: [ App ]
})
export class AppModule { }
