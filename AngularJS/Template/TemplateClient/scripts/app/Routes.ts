import "angular";
import "angular-ui-router";
import { App } from "./Components";

export function routes(
    $stateProvider: angular.ui.IStateProvider,
    $urlRouterProvider: angular.ui.IUrlRouterProvider,
    $locationProvider: ng.ILocationProvider)
{
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true);
    
    $stateProvider
        .state("Main",
        {
            url: "/",
            views:
            {
                "content": 
                {
                    templateUrl: "scripts/app/Components/App.html",
                    controller: "App"
                }
            }
        });
}

routes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
    