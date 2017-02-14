System.register(["moment"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var moment_1;
    var AppDirective, App, GridOptions, GridColumn;
    return {
        setters:[
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            AppDirective = (function () {
                function AppDirective($templateCache) {
                    this.$templateCache = $templateCache;
                    this.restrict = "E";
                    this.replace = true;
                    this.templateUrl = "scripts/app/Components/App.html";
                    this.controller = "App";
                    this.controllerAs = "Ctrl";
                    this.scope = {};
                    //this.template = $templateCache.get<string>("scripts/app/Components/App.html")
                }
                AppDirective.Factory = function () {
                    var directive = function ($templateCache) { return new AppDirective($templateCache); };
                    directive.$inject = ["$templateCache"];
                    return directive;
                };
                return AppDirective;
            }());
            exports_1("AppDirective", AppDirective);
            App = (function () {
                function App($scope, appSettings) {
                    this.$scope = $scope;
                    this.appSettings = appSettings;
                    this.$scope.datePickerOptions = this.createDatePickerOptions();
                    this.$scope.grid1Options = this.createGrid1Options();
                    this.$scope.grid2Options = this.createGrid2Options();
                    this.$scope.startDate = moment_1.default().subtract(1, "year").toDate();
                    this.$scope.endDate = moment_1.default().toDate();
                }
                App.prototype.$onInit = function () {
                    console.log("App.init:");
                    console.log("  originUrl=" + this.appSettings.pageConfig.originUrl);
                    console.log("  rootUrl=" + this.appSettings.pageConfig.rootUrl);
                    console.log("  version=" + this.appSettings.pageConfig.version);
                };
                App.prototype.createDatePickerOptions = function () {
                    var options = {
                        min: moment_1.default("01/01/1900").toDate(),
                        max: moment_1.default("12/31/2100").toDate(),
                        format: "MM/dd/yyyy"
                    };
                    return options;
                };
                App.prototype.createGrid1Options = function () {
                    var options = {
                        columns: [
                            { field: "f1", title: "Assignee Name", width: "*" }
                        ]
                    };
                    return options;
                };
                App.prototype.createGrid2Options = function () {
                    var options = {
                        columns: [
                            { field: "assigneeName", title: "Assignee Name", width: "*" },
                            { field: "grants", title: "Grants", width: 100 },
                            { field: "publications", title: "Publications", width: 100 },
                            { field: "totalActivity", title: "Total Activity", width: 100 }
                        ]
                    };
                    return options;
                };
                App.$inject = ["$scope", "appSettings"];
                return App;
            }());
            exports_1("App", App);
            GridOptions = (function () {
                function GridOptions() {
                }
                return GridOptions;
            }());
            GridColumn = (function () {
                function GridColumn() {
                }
                return GridColumn;
            }());
        }
    }
});
//# sourceMappingURL=App.js.map