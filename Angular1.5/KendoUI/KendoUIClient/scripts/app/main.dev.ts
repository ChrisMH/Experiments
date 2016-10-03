import "angular";
import "app-templates";

import "./Module";

angular.element(document.body).ready(function () {
    angular.bootstrap(document.body, ["app-templates", "Module"], { strictDi: true });
});

