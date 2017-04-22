
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { TestBed, ComponentFixture, inject, async } from "@angular/core/testing";

import { MockHelpers } from "../Mocks";
import { AppSettings } from "../../src/Services";

describe("AppSettings : ", () =>
{
    beforeAll(() => { TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting()); });
    afterAll(() => { TestBed.resetTestEnvironment(); });

    describe(" Happy Path : ", () =>
    {
        beforeEach(() =>
        {
            TestBed.configureTestingModule(
            {
                providers:
                [
                    { provide: "ConfigRoot", useValue: MockHelpers.configRoot },
                    AppSettings
                ]

            });
        });


        it("creates AppSettings", inject([AppSettings], (appSettings: AppSettings) =>
        {
            expect(appSettings).toBeDefined();
        }));

         
        it("creates AppSettings with expected properties", inject([AppSettings], (appSettings: AppSettings) =>
        {
            expect(appSettings.originUrl).toBeDefined();
            expect(appSettings.originUrl).toEqual(<string>MockHelpers.configRoot["app"]["settings"]["originUrl"]);
            expect(appSettings.rootUrl).toBeDefined();
            expect(appSettings.rootUrl).toEqual(<string>MockHelpers.configRoot["app"]["settings"]["rootUrl"]);
            expect(appSettings.version).toBeDefined();
            expect(appSettings.version).toEqual(<string>MockHelpers.configRoot["app"]["settings"]["version"]);
        }));
    });

    describe(" Error Cases : ", () => 
    {
        it("has undefined values when app is undefined", () =>
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
                expect(appSettings.originUrl).toBeUndefined();
                expect(appSettings.rootUrl).toBeUndefined();
                expect(appSettings.version).toBeUndefined();
            });
        });
  
        it("has undefined values when settings is undefined", () =>
        {
            TestBed.configureTestingModule(
                {
                    providers:
                    [
                        { provide: "ConfigRoot", useValue: <any>{ app: <any>{} } },
                        AppSettings
                    ]
                });

            inject([AppSettings], (appSettings: AppSettings) =>
            {
                expect(appSettings).toBeDefined();
                expect(appSettings.originUrl).toBeUndefined();
                expect(appSettings.rootUrl).toBeUndefined();
                expect(appSettings.version).toBeUndefined();
            });

        });        
    });
});
