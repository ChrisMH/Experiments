import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./Components/App";
import { PageConfigProvider } from "./Providers/PageConfig";

@NgModule({
    imports: [
        BrowserModule
    ],

    declarations: [
        AppComponent
    ],

    providers: [
        PageConfigProvider
    ],

    exports: [AppComponent],
    bootstrap: [AppComponent]
})
export class Module { }
