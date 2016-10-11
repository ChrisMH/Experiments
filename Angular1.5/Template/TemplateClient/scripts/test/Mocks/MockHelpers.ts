import "angular";
import "ngMock";

import { AppSettings } from "../../app/Services";

export namespace MockHelpers
{
    export const configRoot: any = {
        page: {
            config: {
                originUrl: "http://origin/",
                rootUrl: "http://origin/root/",
                version: "1.0.0",
                gatewayServiceUrl: "http://gateway/GatewayService/",
                healthServers: [
                    { serverName: "Overview", serviceUrl: "http://overview1/Health/" },
                    { serverName: "Overview 2", serviceUrl: "http://overview2/Health/" }
                ],
                requireAuthentication: false,
                minimumRoleLevel: 1000,
                countersUpdateInterval: 30000,
                backlogUpdateInterval: 20000
            }
        }
    };

    let cookies = {};

    export function installConfigRoot($provide: ng.auto.IProvideService)
    {
        $provide.factory("configRoot", () => configRoot);
    }

    export function installAppSettings($provide: ng.auto.IProvideService)
    {
        installConfigRoot($provide);
        $provide.service("appSettings", AppSettings);
    }
}