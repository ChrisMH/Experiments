import { AppSettings } from "../../src/Services";

export namespace MockHelpers
{
    export const configRoot: any = {
        app: {
            settings: {
                originUrl: "/",
                rootUrl: "/root/",
                version: "1.0.0"
            }
        }
    };

}
