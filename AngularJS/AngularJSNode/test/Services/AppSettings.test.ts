import * as angular from "angular";
import "angular-mocks";

import { configRoot } from "../Mocks";

import { AppSettings } from "../../src/Services";

angular.module("AppSettingsTestModule", [])
    .factory("configRoot", () => configRoot)
    .service("appSettings", AppSettings);

describe("AppSettings : ", () =>
{
    describe("Happy Path : ", () =>
    {
        beforeEach(() =>
        {
            angular.mock.module("AppSettingsTestModule");
        });

        it("can create AppSettings", angular.mock.inject((appSettings: AppSettings) => 
        {
            expect(appSettings).toBeDefined();
        }));
        
        it("can create AppSettings with expected properties", angular.mock.inject((appSettings: AppSettings) =>
        {
            expect(appSettings.originUrl).toBeDefined();
            expect(appSettings.originUrl).toEqual(<string>configRoot["app"]["settings"]["originUrl"]);
            expect(appSettings.rootUrl).toBeDefined();
            expect(appSettings.rootUrl).toEqual(<string>configRoot["app"]["settings"]["rootUrl"]);
            expect(appSettings.version).toBeDefined();
            expect(appSettings.version).toEqual(<string>configRoot["app"]["settings"]["version"]);
        }));
    });

    describe("Error Cases", () =>
    {
        it("has undefined values when app is undefined", () =>
        {
            angular.mock.module(($provide: angular.auto.IProvideService) =>
            {
                $provide.factory("configRoot", () => <any>{ });
                $provide.service("appSettings", AppSettings);
            });

            angular.mock.inject((appSettings: AppSettings) =>
            {
                expect(appSettings).toBeDefined();
                expect(appSettings.originUrl).toBeUndefined();
                expect(appSettings.rootUrl).toBeUndefined();
                expect(appSettings.version).toBeUndefined();
            });
        });

        it("has undefined values when settings is undefined", () =>
        {
            angular.mock.module(($provide: angular.auto.IProvideService) =>
            {
                $provide.factory("configRoot", () => <any>{ page: <any>{} });
                $provide.service("appSettings", AppSettings);
            });

            angular.mock.inject((appSettings: AppSettings) =>
            {
                expect(appSettings).toBeDefined();
                expect(appSettings.originUrl).toBeUndefined();
                expect(appSettings.rootUrl).toBeUndefined();
                expect(appSettings.version).toBeUndefined();
            });
        });

    });
});
