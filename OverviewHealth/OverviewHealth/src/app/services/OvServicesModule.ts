import { NgModule } from "@angular/core";

import { AppSettings } from "./AppSettings";

import { WINDOW } from "./index";

@NgModule({
    providers: [
        { provide: WINDOW, useFactory: () => window },

        AppSettings
    ]
})
export class OvServicesModule
{
}

