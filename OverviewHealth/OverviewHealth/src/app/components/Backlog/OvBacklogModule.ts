import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes }  from "@angular/router";

import { ButtonsModule } from "@progress/kendo-angular-buttons";

import { AccountRouteGuard } from "../Account/AccountRouteGuard";

import { Backlog } from "./Backlog";
import { ServerBlock } from "./ServerBlock";
import { CustomerBlock } from "./CustomerBlock";

const ROUTES: Routes = 
[
    { path: "", component: Backlog, canActivate: [ AccountRouteGuard ] },
    { path: ":serverIndex", component: Backlog, canActivate: [ AccountRouteGuard ] },
    { path: ":serverIndex/:customerIndex", component: Backlog, canActivate: [ AccountRouteGuard ] },
];

const COMPONENTS = [
    Backlog, ServerBlock, CustomerBlock
];

@NgModule({
    imports: [
        BrowserModule, BrowserAnimationsModule, ReactiveFormsModule,

        ButtonsModule,

        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS
    ]
})
export class OvBacklogModule
{
}
 