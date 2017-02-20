import * as angular from "angular";
import "angular-ui-router";
import { Main, AreaChart, Grid } from "./Components";

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
                template: require("./Components/Main.html"),
                controller: "Main",
                controllerAs: "ctrlMain"
            })
            .state("AreaChart",
            {
                url: "/area-chart",
                template: require("./Components/AreaChart/AreaChart.html"),
                controller: "AreaChart",
                controllerAs: "ctrlAreaChart"
            })
            .state("Grid",
            {
                url: "/grid",
                template: require("./Components/Grid/Grid.html"),
                controller: "Grid",
                controllerAs: "ctrlGrid"
            });
    }

    routes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
}
