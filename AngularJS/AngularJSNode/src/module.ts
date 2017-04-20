import * as angular from "angular";

import { App } from "./App";
import { Routes } from "./Routes";
import { FirstPage, SecondPage } from "./Components";
import { AppSettings } from "./Services";

angular.module("Module",
    [
        "ui.router"
    ])
    .config(Routes)
    .factory("configRoot", () => window)

    .controller("App", App)
    .controller("FirstPage", FirstPage)
    .controller("SecondPage", SecondPage)

    .directive(App.getDirective().name, App.getDirective().factory)

    .service("appSettings", AppSettings)

    ;
