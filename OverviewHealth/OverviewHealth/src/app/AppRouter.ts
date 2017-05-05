import { NgModule, Injectable }  from "@angular/core";
import { RouterModule, Routes }  from "@angular/router";

import { Backlog, Login } from "./components";
import { RouteGuard } from "./services";

const routes: Routes = 
[
    { path: "", component: Backlog, canActivate: [ RouteGuard ] },
    { path: ":serverIndex", component: Backlog, canActivate: [ RouteGuard ] },
    { path: ":serverIndex/:customerIndex", component: Backlog, canActivate: [ RouteGuard ] },
    { path: "login", component: Login },
    { path: "**", redirectTo: "/", pathMatch: "full" }
];

export const ROUTER_IMPORTS = [
    RouterModule.forRoot(routes)
];

export const ROUTER_PROVIDERS = [
    RouteGuard
];


