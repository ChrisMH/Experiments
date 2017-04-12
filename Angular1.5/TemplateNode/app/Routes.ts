import * as angular from "angular";
import "angular-ui-router";

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
            .state("Main",
                {
                    url: "/",
                    template: require("./Components/Main.html"),
                    controller: "Main",
                    controllerAs: "ctrlMain"
                });
    }
}
 