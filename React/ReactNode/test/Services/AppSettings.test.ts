import { configRoot } from "../Mocks";

import { AppSettings } from "../../src/Services";

describe("AppSettings : ", () =>
{
    describe("Happy Path : ", () =>
    {        
        it("can create AppSettings with expected properties", () =>
        {
            let appSettings = AppSettings.Load(configRoot, true);

            expect(appSettings.originUrl).toBeDefined();
            expect(appSettings.originUrl).toEqual(<string>configRoot["app"]["settings"]["originUrl"]);
            expect(appSettings.rootUrl).toBeDefined();
            expect(appSettings.rootUrl).toEqual(<string>configRoot["app"]["settings"]["rootUrl"]);
            expect(appSettings.version).toBeDefined();
            expect(appSettings.version).toEqual(<string>configRoot["app"]["settings"]["version"]);
        });
    });

    describe("Error Cases", () =>
    {
        it("has undefined values when app is undefined", () =>
        {
            let appSettings = AppSettings.Load({}, true);

            expect(appSettings).toBeDefined();
            expect(appSettings.originUrl).toBeUndefined();
            expect(appSettings.rootUrl).toBeUndefined();
            expect(appSettings.version).toBeUndefined();
        });

        it("has undefined values when settings is undefined", () =>
        { 
            let appSettings = AppSettings.Load({ app: {} }, true);

            expect(appSettings).toBeDefined();
            expect(appSettings.originUrl).toBeUndefined();
            expect(appSettings.rootUrl).toBeUndefined();
            expect(appSettings.version).toBeUndefined();
        });

    });
});
