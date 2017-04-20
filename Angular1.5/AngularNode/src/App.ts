import * as angular from "angular";

import { AppSettings } from "./Services";
import { AngularUtil } from "./Utilities";

let template = `
    <div id="app">
        <header>
            <h2>Angular 1.x Template</h2>
            <div id="header-links">
                <a ui-sref="Home">Home</a>
                <a ui-sref="Second">Second</a>
            </div>
            <div id="header-version">{{ctrlApp.appSettings.version}}</div>
        </header>
        <section ui-view />
    </div>
`;
import "./App.css";

export class App implements angular.IController
{    
    static $inject = ["appSettings"];

    constructor(protected appSettings: AppSettings)
    {
    }
    
    $onInit()
    {
        console.log("App.$onInit:");
        console.log(`  rootUrl=${this.appSettings.rootUrl}`);
        console.log(`  version=${this.appSettings.version}`);
    }

    private static directive: AngularUtil.Directive;
    static getDirective(): AngularUtil.Directive
    {
        if (!App.directive)
            App.directive = new AngularUtil.Directive("App", template);
        return App.directive;
    }
}
