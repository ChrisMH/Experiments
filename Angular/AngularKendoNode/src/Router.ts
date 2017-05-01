import { NgModule }              from "@angular/core";
import { RouterModule, Routes }  from "@angular/router";

import { DatePickerPage, DonutChartPage, DropDownsPage, GridPage, LineChartPage } from "./Components";

const routes: Routes = 
[
    { path: "", redirectTo: "datepicker", pathMatch: "full" },
    { path: "dropdowns", component: DropDownsPage },
    { path: "datepicker", component: DatePickerPage },
    { path: "donutchart", component: DonutChartPage },
    { path: "grid", component: GridPage },
    { path: "linechart", component: LineChartPage }
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
