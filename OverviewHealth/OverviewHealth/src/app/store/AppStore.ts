import { compose } from "@ngrx/core/compose";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { routerReducer, RouterStoreModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import * as identity from "./Identity";
import * as router from "./Router";

import { IdentityEffects } from "./IdentityEffects";


const reducers: {[key: string]: any} = {};
reducers[router.key] = routerReducer;
reducers[identity.key] = identity.reducer;

const reducer = compose()(reducers);

export const STORE_IMPORTS = [
    RouterStoreModule.connectRouter(),
    
    //StoreModule.provideStore(reducer),
    //StoreDevtoolsModule.instrumentOnlyWithExtension({ maxAge: 10 }),

    //EffectsModule.run(IdentityEffects)
];

 