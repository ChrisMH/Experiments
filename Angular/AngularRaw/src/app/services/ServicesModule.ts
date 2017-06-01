import { InjectionToken, NgModule } from "@angular/core";

import { WINDOW } from "./";
import { AppSettings } from "./AppSettings";

@NgModule({
    providers: [
        { provide: WINDOW, useFactory: () => window },
        AppSettings
    ]
})
export class ServicesModule
{
}
