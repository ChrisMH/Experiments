import "angular";

import { routes } from "./Routes";
import { MainContent } from "./Components/MainContent";

angular.module("Module",
    [
        "ui.router"
    ])
    .config(routes)
    .controller("MainContent", MainContent);

angular.bootstrap(document.body, ["Module"], { strictDi: true });

