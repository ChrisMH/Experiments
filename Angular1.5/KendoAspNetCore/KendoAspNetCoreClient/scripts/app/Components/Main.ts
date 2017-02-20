import * as angular from "angular";
import "angular-ui-router";
import * as moment from "moment";

import "./Main.css";

import { AppSettings } from "../Services";

export class Main implements angular.IController
{
    protected loadTime: Date;

    static $inject = ["$scope", "$state", "appSettings"];

    constructor(protected $scope: angular.IScope,
        protected $state: angular.ui.IStateService,
        protected appSettings: AppSettings)
    {
        this.loadTime = moment().toDate();
    }
        
    $onInit()
    {
        console.log("Main.$onInit:");
        console.log(`  originUrl=${this.appSettings.originUrl}`);
        console.log(`  rootUrl=${this.appSettings.rootUrl}`);
        console.log(`  version=${this.appSettings.version}`);
    }
}

