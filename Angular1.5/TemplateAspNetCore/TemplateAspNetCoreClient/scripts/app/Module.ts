import * as angular from "angular";

import { Router } from "./Router";
import { Main } from "./Components";
import { AppSettings } from "./Services";

angular.module("Module",
    [
        "ui.router"
    ])
    .config(Router.routes)
    .factory("configRoot", () => window)

    .controller("Main", Main)

    .service("appSettings", AppSettings);


