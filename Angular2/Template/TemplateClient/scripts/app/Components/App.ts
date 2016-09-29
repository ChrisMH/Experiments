import { Component } from "@angular/core";

import { AppSettings } from "../Services";

@Component({
    selector: "app",
    templateUrl: "scripts/app/Components/App.html"
})
export class App {
    constructor(private appSettings: AppSettings) { }
}    