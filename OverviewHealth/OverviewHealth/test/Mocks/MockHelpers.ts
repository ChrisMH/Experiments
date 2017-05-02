import { AppSettings } from "../../src/Services";

export namespace MockHelpers
{
    export const configRoot: any = {
        app: {
            settings: {
                originUrl: "/",
                rootUrl: "/root/",
                version: "1.0.0",
                gatewayServiceUrl: "gateway",
                healthServers: [
                    { serverName: "One", serverUrl: "one/health" },
                    { serverName: "Two", serverUrl: "two/health" }
                ],
                minimumRoleLevel: 100,
                updateInterval: 200
            }
        }
    };

}
