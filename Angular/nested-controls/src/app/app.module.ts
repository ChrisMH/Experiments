import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ParentControlComponent } from './parent-control/parent-control.component';
import { ChildControlComponent } from './child-control/child-control.component';

@NgModule({
    declarations: [
        AppComponent,
        ParentControlComponent,
        ChildControlComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
