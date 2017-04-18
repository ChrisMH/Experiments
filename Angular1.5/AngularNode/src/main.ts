import * as angular from "angular";
import "reflect-metadata" // Required for TypedJSON

import "./module";

import "bootstrap-css";
import "./main.css";

angular.element(document.body).ready(() =>
{
    angular.bootstrap(document.body, ["Module"], { strictDi: true });
});    
   