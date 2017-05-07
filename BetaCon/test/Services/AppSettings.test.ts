import { configRoot } from "../Mocks";
import { Container } from "inversify";

import { AppSettings } from "../../src/app/services";

describe("AppSettings : ", () =>
{
    let container: Container;

    beforeEach(() =>
    {
        container = new Container();
        container.bind<AppSettings>(AppSettings).to(AppSettings);

    })
    describe("Happy Path : ", () =>
    {        
        it("can create AppSettings with expected properties", () =>
        {
            container.bind<Object>("configRoot").toConstantValue(configRoot);
            let appSettings = container.get<AppSettings>(AppSettings);

            expect(appSettings.version).toBeDefined();
            expect(appSettings.version).toEqual(<string>configRoot["app"]["settings"]["version"]);
        });
    });

    describe("Error Cases", () =>
    {
        it("has undefined values when app is undefined", () =>
        {
            container.bind<Object>("configRoot").toConstantValue({});
            let appSettings = container.get<AppSettings>(AppSettings);

            expect(appSettings).toBeDefined();
            expect(appSettings.version).toBeUndefined();
        });

        it("has undefined values when settings is undefined", () =>
        { 
            container.bind<Object>("configRoot").toConstantValue({ app: {} });
            let appSettings = container.get<AppSettings>(AppSettings);

            expect(appSettings).toBeDefined();
            expect(appSettings.version).toBeUndefined();
        });

    });
});
