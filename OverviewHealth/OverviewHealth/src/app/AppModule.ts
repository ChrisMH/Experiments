import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes }  from "@angular/router";

import { App } from "./components/App";
import { OvAdminModule } from "./components/Admin/OvAdminModule";
import { OvBacklogModule } from "./components/Backlog/OvBacklogModule";
import { OvStoreModule } from "./store/OvStoreModule";
import { OvServicesModule } from "./services/OvServicesModule";

const ROUTES: Routes = [
    { path: "**", redirectTo: "/", pathMatch: "full" }
];

const COMPONENTS = [
    App
];

@NgModule({
    imports: [
        BrowserModule, BrowserAnimationsModule,
        
        RouterModule.forRoot(ROUTES),

        OvAdminModule,
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
    providers: [
    ],
    bootstrap: [App]
})
export class AppModule 
{
}
