import { NgModule }              from "@angular/core";
import { RouterModule, Routes }  from "@angular/router";

import { FirstPage, SecondPage } from "./Components";

const routes: Routes = 
[
    { path: "", component: FirstPage },
    { path: "second", component: SecondPage }
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
