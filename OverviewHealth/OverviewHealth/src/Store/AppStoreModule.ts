import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { routerReducer, RouterStoreModule } from "@ngrx/router-store";

import * as identity from "./Identity";
import * as router from "./Router";

import { IdentityEffects } from "./IdentityEffects";

const reducers = {};
reducers[router.key] = routerReducer;
reducers[identity.key] = identity.reducer;

@NgModule(
{
    imports: 
    [
        StoreModule.provideStore(reducers),
        RouterStoreModule.connectRouter(),

        EffectsModule.run(IdentityEffects)
    ],
    providers:
    [
        //IdentityEffects
    ],
    exports: 
    [
    ]
})
export class AppStoreModule {}
 