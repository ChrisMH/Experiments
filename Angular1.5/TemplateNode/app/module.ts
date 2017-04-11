import * as angular from "angular";

import { Router } from "./router";
import { Main } from "./Components/index";
//import { AppSettings } from "./Services";

angular.module("Module",
    [
        "ui.router"
    ])
    .config(Router.routes)
    .factory("configRoot", () => window)

    .controller("Main", Main)

    //.service("appSettings", AppSettings)

    ;
