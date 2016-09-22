import { Component } from "@angular/core";

import { PageConfig } from "../Providers/PageConfig";

@Component({
    selector: "app",
    templateUrl: "Client/Components/App.html"
})
export class App {
    constructor(private pageConfig: PageConfig) { }
}   