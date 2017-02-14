System.register(["angular", "angular-ui-router"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function routes($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);
        $stateProvider
            .state("Main", {
            url: "/",
            views: {
                "content": {
                    templateUrl: "scripts/app/Components/App.html",
                    controller: "App"
                }
            }
        });
    }
    exports_1("routes", routes);
    return {
        setters:[
            function (_1) {},
            function (_2) {}],
        execute: function() {
            routes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
        }
    }
});
//# sourceMappingURL=Routes.js.map