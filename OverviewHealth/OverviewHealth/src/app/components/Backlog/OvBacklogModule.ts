import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes }  from "@angular/router";

import { ButtonsModule } from "@progress/kendo-angular-buttons";

import { RouteGuard } from "../../services";

import { Backlog } from "./Backlog";
import { ServerBlock } from "./ServerBlock";
import { CustomerBlock } from "./CustomerBlock";

const ROUTES: Routes = 
[
    { path: "", component: Backlog, canActivate: [ RouteGuard ] },
    { path: ":serverIndex", component: Backlog, canActivate: [ RouteGuard ] },
    { path: ":serverIndex/:customerIndex", component: Backlog, canActivate: [ RouteGuard ] },
];

const COMPONENTS = [
    Backlog, ServerBlock, CustomerBlock
];

@NgModule({
    imports: [
        BrowserModule, BrowserAnimationsModule, FlexLayoutModule, ReactiveFormsModule,

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
 