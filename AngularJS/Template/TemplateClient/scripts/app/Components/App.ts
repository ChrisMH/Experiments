import { AppSettings } from "../Services/AppSettings";
import * as moment from "moment";

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

export class App implements ng.IController
{
    static $inject = ["$scope", "appSettings"];

    constructor(protected $scope: IAppScope, appSettings: AppSettings)
    {
        this.$scope.appSettings = appSettings;
        this.$scope.loadTime = moment().toDate();
    }
        
    $onInit()
    {
        console.log("App.init:");
        console.log(`  originUrl=${this.$scope.appSettings.originUrl}`);
        console.log(`  rootUrl=${this.$scope.appSettings.rootUrl}`);
        console.log(`  version=${this.$scope.appSettings.version}`);
    }
}

