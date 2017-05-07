import { RouterModule, Routes }  from "@angular/router";

import { DatePickerPage, DonutChartPage, DropDownsPage, GridPage, LineChartPage } from "./components";

const routes: Routes = 
[
    { path: "", redirectTo: "datepicker", pathMatch: "full" },
    { path: "dropdowns", component: DropDownsPage },
    { path: "datepicker", component: DatePickerPage },
    { path: "donutchart", component: DonutChartPage },
    { path: "grid", component: GridPage },
    { path: "linechart", component: LineChartPage }
];

export const ROUTER_IMPORTS = [
    RouterModule.forRoot(routes)
];

export const ROUTER_PROVIDERS = [

];
