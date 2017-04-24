import { NgModule }              from "@angular/core";
import { RouterModule, Routes }  from "@angular/router";

import { KendoDatePickerPage, PieChartPage } from "./Components";

const routes: Routes = 
[
    { path: "", redirectTo: "datepicker", pathMatch: "full" },
    { path: "datepicker", component: KendoDatePickerPage },
    { path: "piechart", component: PieChartPage }
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
