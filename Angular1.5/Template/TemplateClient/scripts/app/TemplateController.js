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

            }
        }
    ]);
})();