import { Component } from "@angular/core";

import { AppSettings } from "../Services";

@Component({
    //moduleId: module.id,
    selector: "app",
    template: require("./App.html!text")
})
export class App {
    constructor(private appSettings: AppSettings) { }
}    