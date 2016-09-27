import { Component } from "@angular/core";

import { AppSettings } from "../providers";

@Component({
    selector: "app",
    templateUrl: "Scripts/components/app.component.html"
})
export class App {
    constructor(private appSettings: AppSettings) { }
}    