import { Component } from "@angular/core";

import { AppSettings } from "../Providers/AppSettings";

@Component({
    selector: "app",
    templateUrl: "js/Components/App.html"
})
export class App {
    constructor(private appSettings: AppSettings) { }
}    