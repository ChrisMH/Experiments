﻿import { AppSettings } from "../Services/AppSettings";

export class AppDirective implements ng.IDirective {
    public restrict: string = "E";
    public replace: boolean = true;
    public templateUrl: string = "scripts/app/Components/App.html";
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
}

export class App implements ng.IController
{
    static $inject = ["$scope", "appSettings"];

    constructor(protected $scope: IAppScope, appSettings: AppSettings)
    {
        this.$scope.appSettings = appSettings;
    }
        
    $onInit()
    {
        console.log("App.init:")
        console.log("  originUrl=" + this.$scope.appSettings.pageConfig.originUrl);
        console.log("  rootUrl=" + this.$scope.appSettings.pageConfig.rootUrl);
        console.log("  version=" + this.$scope.appSettings.pageConfig.version);
    }
}

