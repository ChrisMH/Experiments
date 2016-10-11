
import "angular";
import "ngMock";

import { MockHelpers } from "../Mocks";

import { AppSettings } from "../../app/Services";

describe("AppSettings : ", () =>
{
    describe("Happy Path : ", () =>
    {

        beforeEach(() =>
        {
            angular.mock.module(($provide: angular.auto.IProvideService) =>
            {   
                MockHelpers.installAppSettings($provide);
            });
        });

        it("can create AppSettings", angular.mock.inject((appSettings: AppSettings) => 
        {
            expect(appSettings).toBeDefined();
        }));
        

        it("can create AppSettings.pageConfig with expected properties", angular.mock.inject((appSettings: AppSettings) =>
        {
            expect(appSettings.originUrl).toBeDefined();
            expect(appSettings.originUrl).toEqual(<string>MockHelpers.configRoot["page"]["config"]["originUrl"]);
            expect(appSettings.rootUrl).toBeDefined();
            expect(appSettings.rootUrl).toEqual(<string>MockHelpers.configRoot["page"]["config"]["rootUrl"]);
            expect(appSettings.version).toBeDefined();
            expect(appSettings.version).toEqual(<string>MockHelpers.configRoot["page"]["config"]["version"]);
        }));
    });

    describe("Error Cases : ", () =>
    {
        it("has undefined values when page is undefined", () =>
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

        it("has undefined values config is undefined", () =>
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
            });
        });

    });
});
