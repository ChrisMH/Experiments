import * as angular from "angular";
import "kendo";

import { Router } from "./Router";
import { Main, AreaChart, Grid } from "./Components";
import { AppSettings, HttpService } from "./Services";

angular.module("Module",
    [
        "kendo.directives",
        "ui.router"
    ])
    .config(Router.routes)
    .factory("configRoot", () => window)

    .controller("Main", Main)
    .controller("AreaChart", AreaChart)
    .controller("Grid", Grid)

    .service("appSettings", AppSettings)
    .service("httpService", HttpService)
    ;


