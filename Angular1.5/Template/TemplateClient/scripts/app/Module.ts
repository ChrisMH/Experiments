import "angular";

//import { routes } from "./Routes";
import { App, AppDirective } from "./Components";
import { AppSettings } from "./Services";

angular.module("Module",
    [
        //"ui.router"
    ])
    //.config(routes)
    .controller("App", App)
    .directive("app", AppDirective.Factory())
    .service("appSettings", AppSettings);


