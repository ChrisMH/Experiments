import * as angular from "angular";

import "./module";

angular.element(document.body).ready(() =>
{
    angular.bootstrap(document.body, ["Module"], { strictDi: true });
});    
