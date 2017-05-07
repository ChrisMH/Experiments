import { Component } from "@angular/core";

import { AppSettings } from "./services";

@Component({
    selector: "app",
    templateUrl: "App.html",
    styleUrls: ["App.styl"]
})
export class App {
    constructor(public appSettings: AppSettings) { }
} 
