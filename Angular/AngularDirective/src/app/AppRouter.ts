import { RouterModule, Routes }  from "@angular/router";

import { FirstPage, SecondPage } from "./components";

const routes: Routes = 
[
    { path: "", component: FirstPage },
    { path: "second", component: SecondPage },
    { path: "**", redirectTo: "/" }
];

export const ROUTER_IMPORTS: any[] = [
    RouterModule.forRoot(routes)
];

export const ROUTER_PROVIDERS: any[] = [
];
