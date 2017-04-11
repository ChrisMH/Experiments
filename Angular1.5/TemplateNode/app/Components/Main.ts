import * as angular from "angular";
import * as moment from "moment";

import "./Main.css";

//import { AppSettings } from "../Services/AppSettings";

/*
export class AppDirective implements ng.IDirective {
    public restrict: string = "E";
    public replace: boolean = true;
    //public templateUrl: string = "scripts/app/Components/App.html";
    public template: string = require("./App.html!text");
    public controller: string = "App";
    public controllerAs: string = "Ctrl";
    public scope = {};

    constructor(private $templateCache: ng.ITemplateCacheService) {
        //this.template = $templateCache.get<string>("scripts/app/Components/App.html")
    }

    static Factory(): ng.IDirectiveFactory {
        var directive = ($templateCache: ng.ITemplateCacheService) => new AppDirective($templateCache);
        directive.$inject = ["$templateCache"];
        return directive;
    }
}

export interface IAppScope extends ng.IScope
{
    appSettings: AppSettings;
    loadTime: Date;
}

*/
export class Main implements angular.IController
{
    protected loadTime: Date;

    //static $inject = ["appSettings"];

    constructor(/*protected appSettings: AppSettings*/)
    {
        this.loadTime = moment().toDate();
    }
        
    $onInit()
    {
        console.log("Main.$onInit:");
        //console.log(`  originUrl=${this.appSettings.originUrl}`);
        //console.log(`  rootUrl=${this.appSettings.rootUrl}`);
        //console.log(`  version=${this.appSettings.version}`);
    }
}

