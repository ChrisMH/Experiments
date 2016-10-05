import "angular";
import "kendo";

//import { routes } from "./Routes";
import { App, AppDirective } from "./Components";
import { AppSettings } from "./Services";

angular.module("Module",
    [
        "kendo.directives"
    ])
    .factory("configRoot", () => window)
    .controller("App", App)
    .directive("app", AppDirective.Factory())
    .service("appSettings", AppSettings);
    //.config(routes)


