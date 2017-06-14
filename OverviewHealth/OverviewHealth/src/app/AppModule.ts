import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes }  from "@angular/router";

import { ButtonsModule } from "@progress/kendo-angular-buttons";

import { App } from "./components/App";
import { OvAccountModule } from "./components/Account/OvAccountModule";
import { OvBacklogModule } from "./components/Backlog/OvBacklogModule";
import { OvStoreModule } from "./store/OvStoreModule";
import { OvServicesModule } from "./services/OvServicesModule";

const ROUTES: Routes = [
    //{ path: "login", loadChildren: "./components/Admin/OvAdminModule#OvAdminModule" },
    { path: "**", redirectTo: "/", pathMatch: "full" }
];

const COMPONENTS = [
    App
];

@NgModule({
    imports: [
        BrowserModule, BrowserAnimationsModule, FlexLayoutModule,
        
        ButtonsModule,

        RouterModule.forRoot(ROUTES),

        OvAccountModule,
        OvBacklogModule,
        OvStoreModule,
        OvServicesModule
    ],

    declarations: [
        COMPONENTS        
    ],
    exports: [
        COMPONENTS   
    ],
    bootstrap: [App]
})
export class AppModule 
{
}
