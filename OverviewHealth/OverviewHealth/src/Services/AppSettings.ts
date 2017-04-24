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
    requireAuthentication: boolean;
    minimumRoleLevel: number;
    updateInterval: number;

    constructor(@Inject("ConfigRoot") configRoot: any)
    {
        if (configRoot.hasOwnProperty("app") && configRoot["app"].hasOwnProperty("settings"))
        {
            const appSettings = TypedJSON.parse(JSON.stringify(configRoot["app"]["settings"]), InternalAppSettings);
            
            this.originUrl = appSettings.originUrl;
            this.rootUrl = appSettings.rootUrl;
            this.version = appSettings.version;
            this.gatewayServiceUrl = appSettings.gatewayServiceUrl;
            this.healthServers = appSettings.healthServers;
            this.requireAuthentication = appSettings.requireAuthentication;
            this.minimumRoleLevel = appSettings.minimumRoleLevel;
            this.updateInterval = appSettings.updateInterval;
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
    requireAuthentication: boolean;

    @JsonMember
    minimumRoleLevel: number;

    @JsonMember
    updateInterval: number;
}
