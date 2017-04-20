import { Component } from "@angular/core";

import { AppSettings } from "./Services";

import "./App.css";

const template = `
    <header>
        <h2>Angular  Template</h2>
        <div id="header-links">
            <!--<a ui-sref="Home">Home</a>
            <a ui-sref="Second">Second</a> -->
        </div>
        <div id="header-version">{{appSettings.version}}</div>
    </header>
    <section>
        <first-page></first-page>
    </section>
`;
/*
<span>Origin Url: {{appSettings.originUrl}}</span><br/>
<span>Root Url: {{appSettings.rootUrl}}</span><br />
<span>Version: {{appSettings.version}}</span><br/>
*/

@Component({
    //moduleId: module.id,
    selector: "app",
    template: template
})
export class App {
    constructor(private appSettings: AppSettings) { }
} 
