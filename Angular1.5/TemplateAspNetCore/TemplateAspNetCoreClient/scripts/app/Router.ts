import * as angular from "angular";
import "angular-ui-router";
import { Main } from "./Components";

export namespace Router
{
    export function routes(
        $stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider,
        $locationProvider:  angular.ILocationProvider)
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

    routes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
}
