import * as angular from "angular";
import "angular-ui-router";

import { FirstPage, SecondPage } from "./Components";

export class Routes 
{
    static $inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

    constructor($stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider,
        $locationProvider: angular.ILocationProvider)
    {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);

        $stateProvider
        .state("Home",
            {
                url: "/",
                template: require("./Components/FirstPage.html"),
                controller: FirstPage,
                controllerAs: "ctrlFirstPage"
            })
            .state("Second",
            {
                url: "/second",
                template: require("./Components/SecondPage.html"),
                controller: SecondPage,
                controllerAs: "ctrlSecondPage"
            });
    }
}
 