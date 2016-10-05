import { AppSettings } from "../../app/Services";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { TestBed, ComponentFixture, inject, async } from "@angular/core/testing";

describe("AppSettings : ", () =>
{
    beforeAll(() => { TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting()); });
    afterAll(() => { TestBed.resetTestEnvironment(); })

    describe(" Happy Path : ", () =>
    {
        let configRootGood: any = {
            page: {
                config: {
                    originUrl: "http://origin/",
                    rootUrl: "http://origin/root/",
                    version: "1.0.0"
                }
            }
        };

        beforeEach(() =>
        {
            TestBed.configureTestingModule(
            {
                providers:
                [
                    { provide: "ConfigRoot", useValue: configRootGood },
                    AppSettings
                ]

            });
        });


        it("creates AppSettings", inject([AppSettings], (appSettings: AppSettings) =>
        {
            expect(appSettings).toBeDefined();
        }));


        it("creates AppSettings.pageConfig", inject([AppSettings], (appSettings: AppSettings) =>
        {
            expect(appSettings.pageConfig).toBeDefined();
        }));

        it("creates AppSettings.pageConfig with expected properties", inject([AppSettings], (appSettings: AppSettings) =>
        {
            expect(appSettings.pageConfig.originUrl).toEqual(<string>configRootGood["page"]["config"]["originUrl"]);
            expect(appSettings.pageConfig.rootUrl).toEqual(<string>configRootGood["page"]["config"]["rootUrl"]);
            expect(appSettings.pageConfig.version).toEqual(<string>configRootGood["page"]["config"]["version"]);
        }));
    });

    describe(" Error Cases : ", () => 
    {
        it("has undefined AppSettings.pageConfig when page is undefined", () =>
        {
            TestBed.configureTestingModule(
            {
                providers:
                [
                    { provide: "ConfigRoot", useValue: <any>{} },
                    AppSettings
                ]
            });

            inject([AppSettings], (appSettings: AppSettings) =>
            {
                expect(appSettings).toBeDefined();
                expect(appSettings.pageConfig).toBeUndefined();
            });
        });

        it("has undefined AppSettings.pageConfig when config is undefined", () =>
        {
            TestBed.configureTestingModule(
                {
                    providers:
                    [
                        { provide: "ConfigRoot", useValue: <any>{ page: <any>{} } },
                        AppSettings
                    ]
                });

            inject([AppSettings], (appSettings: AppSettings) =>
            {
                expect(appSettings).toBeDefined();
                expect(appSettings.pageConfig).toBeUndefined();
            });

        });        
    });
});
