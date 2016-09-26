import { Component } from "@angular/core";

import { PageConfigProvider } from "../Providers/PageConfig";

@Component({
    selector: "app",
    templateUrl: "Scripts/Components/App.html"
})
export class App {
    constructor(private pageConfig: PageConfigProvider) { }
}    