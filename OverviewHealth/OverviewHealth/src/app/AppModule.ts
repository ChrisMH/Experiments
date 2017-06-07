import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes }  from "@angular/router";

import { STORE_IMPORTS } from "./store/AppStore";

import { App } from "./components/App";
import { Backlog, CustomerBlock, ServerBlock } from "./components";
import { OvAdminModule } from "./components/Admin";
import { OvServicesModule } from "./services";

const ROUTES: Routes = 
[
    { path: "", component: Backlog /*, canActivate: [ RouteGuard ]*/ },
    { path: ":serverIndex", component: Backlog/*, , canActivate: [ RouteGuard ]*/ },
    { path: ":serverIndex/:customerIndex", component: Backlog/*, , canActivate: [ RouteGuard ]*/ },
    { path: "**", redirectTo: "/", pathMatch: "full" }
];

const COMPONENTS = [
    App,
    Backlog, CustomerBlock, ServerBlock
]

@NgModule({
    imports: [
        BrowserModule, BrowserAnimationsModule,
        ReactiveFormsModule,
        
        RouterModule.forRoot(ROUTES),
        STORE_IMPORTS,

        OvAdminModule,
        OvServicesModule
    ],

    declarations: [
        COMPONENTS        
    ],
    exports: [
        COMPONENTS   
    ],
    providers: [
    ],
    bootstrap: [App]
})
export class AppModule { }
