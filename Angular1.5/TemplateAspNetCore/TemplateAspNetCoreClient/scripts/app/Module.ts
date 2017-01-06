import * as angular from "angular";

import { Router } from "./Router";
import { App } from "./Components";
import { AppSettings } from "./Services";

angular.module("Module",
    [
        "ui.router"
    ])
    .config(Router.routes)
    .factory("configRoot", () => window)

    .controller("App", App)

    .service("appSettings", AppSettings);


