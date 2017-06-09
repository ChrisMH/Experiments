import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes }  from "@angular/router";

import { ButtonsModule } from "@progress/kendo-angular-buttons";

import { Login } from "./Login";

const ROUTES: Routes = 
[
    { path: "login", component: Login }
];

const COMPONENTS = [
    Login
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
export class OvAdminModule
{
}
 