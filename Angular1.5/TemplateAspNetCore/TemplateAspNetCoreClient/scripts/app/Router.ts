import * as angular from "angular";
import "angular-ui-router";
import { App } from "./Components";

export namespace Router
{
    export function routes(
        $stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider,
        $locationProvider: angular.ILocationProvider)
    {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);

        $stateProvider
            .state("Main",
            {
                url: "/",
                template: require("./Components/App.html"),
                controller: "App",
                controllerAs: "ctrlApp"
            });
    }

    routes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
}
