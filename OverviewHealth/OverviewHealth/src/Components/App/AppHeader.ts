import { Component } from "@angular/core";
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import * as moment from "moment";
import * as Rx from "rxjs";

import { AppState } from "../../Store";
import { AppSettings, OvCookieService, OvPrincipalService, Identity } from "../../Services";

@Component({
    moduleId: module.id,
    selector: "app-header",
    templateUrl: "./AppHeader.html",
    styleUrls: ["./AppHeader.css"]
})
 
export class AppHeader
{
    protected userName: string;

    constructor(
        protected store: Store<AppState>,
        protected appSettings: AppSettings, 
        protected cookieService: OvCookieService,
        protected principalService: OvPrincipalService)
    {
    }

    ngOnInit(): void
    {

    }

    onLogout(): void
    {
        this.principalService.revoke();
        this.cookieService.removeIdentityToken();
        this.store.dispatch(go("login"));
    }
}
