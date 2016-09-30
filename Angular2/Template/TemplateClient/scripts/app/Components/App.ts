import { Component } from "@angular/core";

import { AppSettings } from "../Services";

@Component({
    moduleId: module.id,
    selector: "app",
    templateUrl: "./App.html"
})
export class App {
    constructor(private appSettings: AppSettings) { }
}    