import "reflect-metadata"
import "angular";

import "./Module";

angular.bootstrap(document.body, ["Module"], { strictDi: true });

