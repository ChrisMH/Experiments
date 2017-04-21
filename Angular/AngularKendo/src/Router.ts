import { NgModule }              from "@angular/core";
import { RouterModule, Routes }  from "@angular/router";

import { KendoDatePickerPage, SecondPage } from "./Components";

const routes: Routes = 
[
    { path: "", redirectTo: "datepicker", pathMatch: "full" },
    { path: "datepicker", component: KendoDatePickerPage },
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
