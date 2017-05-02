
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { TestBed, ComponentFixture, inject, async } from "@angular/core/testing";

import { MockHelpers } from "../Mocks";
import { AppSettings, HealthServer } from "../../src/Services";

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
            expect(appSettings.gatewayServiceUrl).toBeDefined();
            expect(appSettings.gatewayServiceUrl).toEqual(<string>MockHelpers.configRoot["app"]["settings"]["gatewayServiceUrl"]);

            expect(appSettings.healthServers).toBeDefined();
            expect(appSettings.healthServers.length).toEqual((<HealthServer[]>MockHelpers.configRoot["app"]["settings"]["healthServers"]).length)
            for(let i = 0 ; i < appSettings.healthServers.length ; i++)
            {
                expect(appSettings.healthServers[i].serverName).toBeDefined();
                expect(appSettings.healthServers[i].serverName).toEqual(<string>(<HealthServer[]>MockHelpers.configRoot["app"]["settings"]["healthServers"])[i]["serverName"]);
                expect(appSettings.healthServers[i].serverUrl).toBeDefined();
                expect(appSettings.healthServers[i].serverUrl).toEqual(<string>(<HealthServer[]>MockHelpers.configRoot["app"]["settings"]["healthServers"])[i]["serverUrl"]);
            }

            expect(appSettings.minimumRoleLevel).toBeDefined();
            expect(appSettings.minimumRoleLevel).toEqual(<number>MockHelpers.configRoot["app"]["settings"]["minimumRoleLevel"]);
            expect(appSettings.updateInterval).toBeDefined();
            expect(appSettings.updateInterval).toEqual(<number>MockHelpers.configRoot["app"]["settings"]["updateInterval"]);
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
