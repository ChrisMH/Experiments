import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes }  from "@angular/router";

import { ButtonsModule } from "@progress/kendo-angular-buttons";

import { AccountRouteGuard } from "./AccountRouteGuard";

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
        BrowserModule, BrowserAnimationsModule, ReactiveFormsModule,

        ButtonsModule,

        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        COMPONENTS
    ],
    providers: [
        AccountRouteGuard
    ],
    exports: [
        COMPONENTS
    ]
})
export class OvAccountModule
{
}
