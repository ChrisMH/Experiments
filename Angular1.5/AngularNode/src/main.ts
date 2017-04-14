import * as angular from "angular";

import "./module";
import "./main.css";

angular.element(document.body).ready(() =>
{
    angular.bootstrap(document.body, ["Module"], { strictDi: true });
});    
   