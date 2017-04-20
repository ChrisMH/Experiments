System.register(["typedjson", "../Models"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var typedjson_1, Models_1;
    var AppSettings;
    return {
        setters:[
            function (typedjson_1_1) {
                typedjson_1 = typedjson_1_1;
            },
            function (Models_1_1) {
                Models_1 = Models_1_1;
            }],
        execute: function() {
            AppSettings = (function () {
                function AppSettings() {
                    if (window.hasOwnProperty("page") && window["page"].hasOwnProperty("config")) {
                        this.pageConfig = typedjson_1.TypedJSON.parse(JSON.stringify(window["page"]["config"]), Models_1.PageConfig);
                    }
                }
                AppSettings.prototype.$get = function () {
                    return new AppSettings();
                };
                return AppSettings;
            }());
            exports_1("AppSettings", AppSettings);
        }
    }
});
//# sourceMappingURL=AppSettings.js.map