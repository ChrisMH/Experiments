import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppComponent } from './app.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { SecondPageComponent } from './components/second-page/second-page.component';

import { RouterState } from './store/router.state';

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
        RouterModule.forRoot(routes),
        NgxsModule.forRoot([RouterState]),
        NgxsLoggerPluginModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
