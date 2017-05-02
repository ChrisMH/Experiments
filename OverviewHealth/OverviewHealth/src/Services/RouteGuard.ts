import { Injectable }  from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";

import { Store } from "@ngrx/store";
import { go } from "@ngrx/router-store";
import * as rx from "rxjs";

import { AppState } from "../Store";
import * as identity from "../Store/Identity"

@Injectable()
export class RouteGuard implements CanActivate
{
    constructor(protected store: Store<AppState>) 
    {}

    canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): rx.Observable<boolean>
    {
        this.store.dispatch(identity.authorize());
        return this.store.select(identity.key)
            .skipWhile((state: identity.State) => state.loggingIn)
            .map((state: identity.State) => 
            { 
                console.log(`RouteGuard.canActivate: loggedIn=${state.loggedIn}`);  
                
                if(state.loggedIn) 
                    return true;

                this.store.dispatch(go(["login", {returnUrl: routerState.url }]));
                
                return state.loggedIn; 
            });
    }
}