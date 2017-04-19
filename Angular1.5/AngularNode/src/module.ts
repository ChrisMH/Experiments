import * as angular from "angular";

import { Routes } from "./Routes";
import { Main } from "./Components";
import { AppSettings } from "./Services";

angular.module("Module",
    [
        "ui.router"
    ])
    .config(Routes)
    .factory("configRoot", () => window)

    .controller("Main", Main)

    .service("appSettings", AppSettings)

    ;
