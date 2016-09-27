import { Component } from "@angular/core";

import { AppSettings } from "../services";

@Component({
    selector: "app",
    templateUrl: "scripts/components/app.component.html"
})
export class App {
    constructor(private appSettings: AppSettings) { }
}    