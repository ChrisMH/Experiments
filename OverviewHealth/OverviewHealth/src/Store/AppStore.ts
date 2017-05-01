import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { routerReducer, RouterStoreModule } from "@ngrx/router-store";

import { principalReducer } from "../Store";


@NgModule(
{
    imports: 
    [
        StoreModule.provideStore(
        { 
            router: routerReducer,
            identity: principalReducer
        }),
        RouterStoreModule.connectRouter()
    ],
    exports: 
    [
        StoreModule
    ]
})
export class AppStore {}
