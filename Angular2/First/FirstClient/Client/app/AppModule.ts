import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FirstApp } from "./FirstApp";

@NgModule({
    imports: [BrowserModule],

    declarations: [FirstApp],
    exports: [FirstApp],
    bootstrap: [FirstApp]
})
export class AppModule { }
