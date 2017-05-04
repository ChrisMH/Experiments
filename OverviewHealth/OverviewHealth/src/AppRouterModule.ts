import { NgModule, Injectable }  from "@angular/core";
import { RouterModule, Routes }  from "@angular/router";

import { Backlog, Login } from "./Components";
import { RouteGuard } from "./Services";

const routes: Routes = 
[
    { path: "", component: Backlog, canActivate: [ RouteGuard ] },
    { path: ":serverIndex", component: Backlog, canActivate: [ RouteGuard ] },
    { path: ":serverIndex/:customerIndex", component: Backlog, canActivate: [ RouteGuard ] },
    { path: "login", component: Login },
    { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule(
{
    imports: 
    [
        RouterModule.forRoot(routes)
    ],
    providers:
    [
        RouteGuard
    ],
    exports: 
    [
        RouterModule
    ]
})
export class AppRouterModule {}

