import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { ButtonsModule } from "@progress/kendo-angular-buttons";

import * as comp from "./Components";
import * as serv from "./Services";

@NgModule({
    imports: [
        BrowserModule,
        ButtonsModule
    ],

    declarations: [ 
        comp.App
    ],

    providers: [
        serv.AppSettings
    ],

    exports: [comp.App],
    bootstrap: [comp.App]
})
export class Module { }
