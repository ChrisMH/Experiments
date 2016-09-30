(function ()
{
    angular.module("TemplateApp")

    .controller("TemplateController",
    [
        "$scope", function($scope)
        {
            $scope.init = function (appConfig)
            {
                appConfig = angular.fromJson(appConfig);
                console.log("TemplateController.init:")
                console.log("  originUrl=" + appConfig.originUrl);
                console.log("  rootUrl=" + appConfig.rootUrl);
                console.log("  version=" + appConfig.version);
            }
        }
    ]);
})();