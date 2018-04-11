import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { SecondPageComponent } from './components/second-page/second-page.component';

const routes: Routes =
    [
        { path: '', component: FirstPageComponent },
        { path: 'second', component: SecondPageComponent },
        { path: '**', redirectTo: '/', pathMatch: 'full' }
    ];

@NgModule({
    declarations: [
        AppComponent,
        FirstPageComponent,
        SecondPageComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
