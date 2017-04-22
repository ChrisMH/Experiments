import { Component } from "@angular/core";

import { AppSettings } from "./Services";

@Component({
    moduleId: module.id,
    selector: "app",
    templateUrl: "./App.html",
    styleUrls: ["./App.css"]
})
export class App {
    constructor(private appSettings: AppSettings) { }
} 
 