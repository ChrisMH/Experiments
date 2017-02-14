System.register(["angular", "kendo", "./Components", "./Services"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var angular_1, Components_1, Services_1;
    return {
        setters:[
            function (angular_1_1) {
                angular_1 = angular_1_1;
            },
            function (_1) {},
            function (Components_1_1) {
                Components_1 = Components_1_1;
            },
            function (Services_1_1) {
                Services_1 = Services_1_1;
            }],
        execute: function() {
            angular_1.default.module("Module", [
                "kendo.directives"
            ])
                .controller("App", Components_1.App)
                .directive("app", Components_1.AppDirective.Factory())
                .service("appSettings", Services_1.AppSettings);
        }
    }
});
//# sourceMappingURL=Module.js.map