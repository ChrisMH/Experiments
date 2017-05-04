import { Store } from "@ngrx/store";
import { RouterState } from "@ngrx/router-store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/first";

import { AppState } from "./AppState";

export const key = "router";


export const getState = (store: Store<AppState>): RouterState =>
{
    let state: RouterState;
    store.select(key).first().subscribe((s: RouterState) => state = s);
    return state;
} 