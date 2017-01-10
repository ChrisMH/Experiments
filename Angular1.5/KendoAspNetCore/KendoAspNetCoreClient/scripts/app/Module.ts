import * as angular from "angular";
import "kendo";

import { Router } from "./Router";
import { Main, Charts } from "./Components";
import { AppSettings } from "./Services";

angular.module("Module",
    [
        "kendo.directives",
        "ui.router"
    ])
    .config(Router.routes)
    .factory("configRoot", () => window)

    .controller("Main", Main)
    .controller("Charts", Charts)

    .service("appSettings", AppSettings);


