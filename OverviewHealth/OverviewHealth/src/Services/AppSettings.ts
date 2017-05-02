import { Injectable, Inject } from "@angular/core";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";


@Injectable()
export class AppSettings
{
    originUrl: string;
    rootUrl: string;
    version: string;
    gatewayServiceUrl: string;
    healthServers: Array<HealthServer>;
    minimumRoleLevel: number;
    updateInterval: number;

    constructor(@Inject("ConfigRoot") configRoot: any)
    {
        if (configRoot.hasOwnProperty("app") && configRoot["app"].hasOwnProperty("settings"))
        {
            const appSettings = TypedJSON.parse(JSON.stringify(configRoot["app"]["settings"]), InternalAppSettings);
            
            Object.assign(this, appSettings);     
        }
    }
}

@JsonObject
export class HealthServer
{
    @JsonMember
    serverName: string;

    @JsonMember
    serverUrl: string;
}

@JsonObject
class InternalAppSettings
{
    @JsonMember
    originUrl: string;

    @JsonMember
    rootUrl: string;

    @JsonMember
    version: string;

    @JsonMember
    gatewayServiceUrl: string;

    @JsonMember({elements: HealthServer})
    healthServers: Array<HealthServer>;

    @JsonMember
    minimumRoleLevel: number;

    @JsonMember
    updateInterval: number;
}
