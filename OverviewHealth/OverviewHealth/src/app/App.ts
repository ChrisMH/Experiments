import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { go } from "@ngrx/router-store";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { AppState } from "./store/AppState";
import * as identity from "./store/Identity";
import * as router from "./store/Router";

import { AppSettings } from "./services";

@Component({
    selector: "app",
    templateUrl: "App.html",
    styleUrls: ["App.styl"]
})
export class App 
{
    protected identity: Observable<identity.State>;
    private routerSub: Subscription;

    constructor(
        protected store: Store<AppState>, 
        protected appSettings: AppSettings)
    {
        this.identity = store.select(identity.key)
    }

    ngOnInit(): void
    {
        this.routerSub = this.store.select(router.key).subscribe((value: Object) =>
        {
            console.log("Router change:", value);
        });
    }

    ngOnDestory(): void
    {
        if(this.routerSub)
            this.routerSub.unsubscribe();
    }

    onLogout(): void
    {
        this.store.dispatch(identity.revoke());
        this.store.dispatch(go("login"));
    }
} 
