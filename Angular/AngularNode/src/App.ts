import { Component } from "@angular/core";

import { AppSettings } from "./Services";

const template = `
    <header>
        <h2>Angular  Template</h2>
        <div id="header-links">
            <a routerLink="/">Home</a>
            <a routerLink="/second">Second</a>
        </div>
        <div id="header-version">{{appSettings.version}}</div>
    </header>
    <div id="view">
        <router-outlet></router-outlet>
    </div>
`;
//const styles = [require("./App.css").toString()];

@Component({
    moduleId: module.id,
    selector: "app",
    template: template,
    //styles: styles
    styleUrls: ["App.css"]
})
export class App {
    constructor(private appSettings: AppSettings) { }
} 
