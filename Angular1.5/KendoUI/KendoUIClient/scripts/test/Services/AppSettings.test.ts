import "angular";
import "ngMock";

import { AppSettings } from "../../app/Services";

describe("AppSettings : ", () =>
{
    describe("Happy Path : ", () =>
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
            angular.mock.module(($provide: angular.auto.IProvideService) =>
            {
                $provide.factory("configRoot", () => configRootGood);
                $provide.service("appSettings", AppSettings);
            });
        });

        it("can create AppSettings", angular.mock.inject((appSettings: AppSettings) => 
        {
            expect(appSettings).toBeDefined();
        }));

        it("can create AppSettings.pageConfig", angular.mock.inject((appSettings: AppSettings) => 
        {
            expect(appSettings.pageConfig).toBeDefined();
        }));

        it("can create AppSettings.pageConfig with expected properties", angular.mock.inject((appSettings: AppSettings) =>
        {
            expect(appSettings.pageConfig.originUrl).toEqual(<string>configRootGood["page"]["config"]["originUrl"]);
            expect(appSettings.pageConfig.rootUrl).toEqual(<string>configRootGood["page"]["config"]["rootUrl"]);
            expect(appSettings.pageConfig.version).toEqual(<string>configRootGood["page"]["config"]["version"]);
        }));
    });

    describe("Error Cases", () =>
    {
        it("has undefined AppSettings.pageConfig when page is undefined", () =>
        {
            angular.mock.module(($provide: angular.auto.IProvideService) =>
            {
                $provide.factory("configRoot", () => <any>{ });
                $provide.service("appSettings", AppSettings);
            });

            angular.mock.inject((appSettings: AppSettings) =>
            {
                expect(appSettings).toBeDefined();
                expect(appSettings.pageConfig).toBeUndefined();
            });
        });

        it("has undefined AppSettings.pageConfig when config is undefined", () =>
        {
            angular.mock.module(($provide: angular.auto.IProvideService) =>
            {
                $provide.factory("configRoot", () => <any>{ page: <any>{} });
                $provide.service("appSettings", AppSettings);
            });

            angular.mock.inject((appSettings: AppSettings) =>
            {
                expect(appSettings).toBeDefined();
                expect(appSettings.pageConfig).toBeUndefined();
            });
        });

    });
});
