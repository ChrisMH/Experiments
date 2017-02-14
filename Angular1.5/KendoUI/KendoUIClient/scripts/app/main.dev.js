System.register(["angular", "app-templates", "./Module"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[
            function (_1) {},
            function (_2) {},
            function (_3) {}],
        execute: function() {
            angular.element(document.body).ready(function () {
                angular.bootstrap(document.body, ["app-templates", "Module"], { strictDi: true });
            });
        }
    }
});
//# sourceMappingURL=main.dev.js.map