import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import * as c from "./components";
import * as p from "./providers";

@NgModule({
    imports: [
        BrowserModule
    ],

    declarations: [ 
        c.App
    ],

    providers: [
        p.AppSettings
    ],

    exports: [c.App],
    bootstrap: [c.App]
})
export class Module { }
