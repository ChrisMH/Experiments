import $ from "jquery";
import angular from "angular";
import "kendo";

//import { routes } from "./Routes";
import { App, AppDirective } from "./Components";
import { AppSettings } from "./Services";

angular.module("Module",
    [
        "kendo.directives"
    ])
    //.config(routes)
    .controller("App", App)
    .directive("app", AppDirective.Factory())
    .service("appSettings", AppSettings);


