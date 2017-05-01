import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as Rx from "rxjs";

import { AppState } from "../../Store";
import { AppSettings } from "../../Services";

@Component({
    moduleId: module.id,
    selector: "app",
    template: `
        <app-header></app-header>
        <div id="view-container">
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ["./App.css"]
})
export class App 
{
    private routerSub: Rx.Subscription;

    constructor(protected store: Store<AppState>, private appSettings: AppSettings)
    {
        
    }

    ngOnInit(): void
    {
        this.routerSub = this.store.select("router").subscribe((value: Object) =>
        {
            console.log("Router change:", value);
        });
    }

    ngOnDestory(): void
    {
        if(this.routerSub)
            this.routerSub.unsubscribe();
    }
} 
