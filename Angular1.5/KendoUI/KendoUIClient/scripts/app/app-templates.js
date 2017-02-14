require('angular');//HEAD 
(function(app) {
try { app = angular.module("app-templates"); }
catch(err) { app = angular.module("app-templates", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("scripts/app/Components/App.html","<div id=\"content\">\n" +
    "    <h3>KendoUI Angular 1.5 Template</h3>\n" +
    "\n" +
    "    <kendo-datepicker id=\"start-date\" k-options=\"datePickerOptions\" k-ng-model=\"startDate\"/>\n" +
    "    <kendo-datepicker id=\"end-date\" k-options=\"datePickerOptions\" k-ng-model=\"endDate\" />\n" +
    "\n" +
    "    <input id=\"chk1\" type=\"checkbox\" class=\"k-checkbox\" /><label class=\"k-checkbox-label\" for=\"chk1\">Checkbox 1</label>\n" +
    "    <kendo-grid id=\"grid1\" k-options=\"grid1Options\"/>\n" +
    "    <kendo-grid id=\"grid2\" k-options=\"grid2Options\" />\n" +
    "</div>\n" +
    "")
}]);
})();