import { Store } from "@ngrx/store";
import { RouterState } from "@ngrx/router-store";
import * as rx from "rxjs";

import { AppState } from "./AppState";

export const key = "router";


export const getState = (store: Store<AppState>): RouterState =>
{
    let state: RouterState;
    store.select(key).take(1).subscribe((s: RouterState) => state = s);
    return state;
}