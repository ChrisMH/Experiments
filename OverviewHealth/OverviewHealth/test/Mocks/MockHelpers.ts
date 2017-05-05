import { AppSettings } from "../../src/app/services";

export namespace MockHelpers
{
    export const configRoot: any = {
        app: {
            settings: {
                version: "1.2.3",
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
