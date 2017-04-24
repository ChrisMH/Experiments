import { NgModule }              from "@angular/core";
import { RouterModule, Routes }  from "@angular/router";

import { Backlog, Login } from "./Components";

const routes: Routes = 
[
    { path: "", component: Backlog },
    { path: "login", component: Login }
];

@NgModule(
{
  imports: 
  [
    RouterModule.forRoot(routes)
  ],
  exports: 
  [
    RouterModule
  ]
})
export class Router {}
