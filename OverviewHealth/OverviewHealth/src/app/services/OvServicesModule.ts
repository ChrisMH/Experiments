import { NgModule } from "@angular/core";

import { AppSettings } from "./AppSettings";
import { RouteGuard } from "./RouteGuard";

import { WINDOW } from "./index";

@NgModule({
    providers: [
        { provide: WINDOW, useFactory: () => window },
        AppSettings,
        RouteGuard
    ]
})
export class OvServicesModule
{
}

