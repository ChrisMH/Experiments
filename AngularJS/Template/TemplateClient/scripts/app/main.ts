import * as angular from "angular";

import "./Module";

angular.element(document.body).ready(function () {
    angular.bootstrap(document.body, ["Module"], { strictDi: true });
});

