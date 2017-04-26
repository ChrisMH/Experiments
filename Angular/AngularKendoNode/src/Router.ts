import { NgModule }              from "@angular/core";
import { RouterModule, Routes }  from "@angular/router";

import { DatePickerPage, DropDownsPage, PieChartPage } from "./Components";

const routes: Routes = 
[
    { path: "", redirectTo: "datepicker", pathMatch: "full" },
    { path: "dropdowns", component: DropDownsPage },
    { path: "datepicker", component: DatePickerPage },
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
