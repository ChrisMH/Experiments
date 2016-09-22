import { Component } from "@angular/core";

import { PageConfigProvider } from "../Providers/PageConfig";

@Component({
    selector: "app",
    templateUrl: "Client/Components/App.html"
})
export class AppComponent {
    constructor(private pageConfig: PageConfigProvider) { }
}   