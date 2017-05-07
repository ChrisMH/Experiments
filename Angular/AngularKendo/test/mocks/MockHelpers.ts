import { AppSettings } from "../../src/app/services";

export namespace MockHelpers
{
    export const configRoot: any = {
        app: {
            settings: {
                version: "1.3.2",
                service: "http://service.address"
            }
        }
    };

}
