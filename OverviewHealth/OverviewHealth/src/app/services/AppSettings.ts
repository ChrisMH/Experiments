import { Injectable, Inject } from "@angular/core";

import { WINDOW } from "./index";

@Injectable()
export class AppSettings
{
    version: string;
    gatewayServiceUrl: string;
    healthServers: Array<HealthServer>;
    minimumRoleLevel: number;
    updateInterval: number;

    constructor(@Inject(WINDOW) window: Window)
    {
        if (window.hasOwnProperty("app") && window["app"].hasOwnProperty("settings"))
        {            
            Object.assign(this, window["app"]["settings"]);     
        }
    }
}

export interface HealthServer
{
    serverName: string;
    serverUrl: string;
}
