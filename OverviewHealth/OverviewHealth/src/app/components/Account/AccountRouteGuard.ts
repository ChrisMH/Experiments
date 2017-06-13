import { Injectable }  from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { Store } from "@ngrx/store";
import { go } from "@ngrx/router-store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/skipWhile";

import { AppState } from "../../store/AppState";
import * as identity from "../../store/Identity"

@Injectable()
export class AccountRouteGuard implements CanActivate
{
    constructor(protected router: Router, protected store: Store<AppState>) 
    {
    }

    canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean>
    {
        this.store.dispatch(identity.authorize());
        return this.store.select(identity.key)
            .skipWhile((state: identity.State) => state.loggingIn)
            .map((state: identity.State) => 
            {                 
                if(state.loggedIn) 
                    return true;

                //this.store.dispatch(go(["login"], {returnUrl: routerState.url }));
                this.router.navigate(["login"], {queryParams: { returnUrl: routerState.url }})
                return state.loggedIn; 
            });
    }
} 
