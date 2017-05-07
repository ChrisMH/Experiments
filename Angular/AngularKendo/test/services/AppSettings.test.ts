import { TestBed, ComponentFixture, inject, async } from "@angular/core/testing";

import { MockHelpers } from "../mocks";
import { AppSettings } from "../../src/app/services";

describe("AppSettings : ", () =>
{
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
            expect(appSettings.version).toBeDefined();
            expect(appSettings.version).toEqual(<string>MockHelpers.configRoot["app"]["settings"]["version"]);
            expect(appSettings.service).toBeDefined();
            expect(appSettings.service).toEqual(<string>MockHelpers.configRoot["app"]["settings"]["service"]);
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
                expect(appSettings.version).toBeUndefined();
                expect(appSettings.service).toBeUndefined();
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
                expect(appSettings.version).toBeUndefined();
                expect(appSettings.service).toBeUndefined();
            });

        });        
    });
});
