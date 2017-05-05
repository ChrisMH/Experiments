import { RouterState } from "@ngrx/router-store";

import * as identity from "./Identity";

export interface AppState
{
    router: RouterState;
    identity: identity.State;
}

