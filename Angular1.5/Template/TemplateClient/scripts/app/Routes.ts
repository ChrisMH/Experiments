import "angular";
import "angular-ui-router";
import { MainContent } from "./Components/MainContent";

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
                    templateUrl: "scripts/app/Components/MainContent.html",
                    controller: "MainContent"
                }
            }
        });
}

routes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
    