import { Component } from "@angular/core";

import { AppSettings } from "../Services";

@Component({
    moduleId: module.id,
    selector: "app",
    templateUrl: "./App.html"
})
export class App {
    date: Date = new Date();

    constructor(private appSettings: AppSettings) { }

    onButtonClick() {
        console.log("onButtonClick");
    }
}    