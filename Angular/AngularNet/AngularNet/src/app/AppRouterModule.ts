import { NgModule }              from "@angular/core";
import { RouterModule, Routes }  from "@angular/router";

import { FirstPage, SecondPage } from "./components";

const routes: Routes = 
[
    { path: "", component: FirstPage },
    { path: "second", component: SecondPage },
    { path: "**", redirectTo: "/" }
];

@NgModule(
{
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouterModule {}
