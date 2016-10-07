/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../../typings/globals/angular/index.d.ts" />
/// <reference path="../../../typings/globals/angular-mocks/index.d.ts" />

import "angular";
import "ngMock";

import { AppSettings } from "../../app/Services";

describe("AppSettings : ",
    () =>
    {
        describe("Happy Path : ",
            () =>
            {
                const configRootGood: any = {
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

                it("can create AppSettings",
                    angular.mock.inject((appSettings: AppSettings) =>
                    {
                        expect(appSettings).toBeDefined();
                    }));

                it("can create AppSettings.pageConfig",
                    angular.mock.inject((appSettings: AppSettings) =>
                    {
                        expect(appSettings.pageConfig).toBeDefined();
                    }));

                it("can create AppSettings.pageConfig with expected properties",
                    angular.mock.inject((appSettings: AppSettings) =>
                    {
                        expect(appSettings.pageConfig.originUrl)
                            .toEqual(configRootGood["page"]["config"]["originUrl"] as string);
                        expect(appSettings.pageConfig.rootUrl)
                            .toEqual(configRootGood["page"]["config"]["rootUrl"] as string);
                        expect(appSettings.pageConfig.version)
                            .toEqual(configRootGood["page"]["config"]["version"] as string);
                    }));
            });

        describe("Error Cases : ",
            () =>
            {
                it("has undefined AppSettings.pageConfig when page is undefined",
                    () =>
                    {
                        angular.mock.module(($provide: angular.auto.IProvideService) =>
                        {
                            $provide.factory("configRoot", () => ({} as any));
                            $provide.service("appSettings", AppSettings);
                        });

                        angular.mock.inject((appSettings: AppSettings) =>
                        {
                            expect(appSettings).toBeDefined();
                            expect(appSettings.pageConfig).toBeUndefined();
                        });
                    });

                it("has undefined AppSettings.pageConfig when config is undefined",
                    () =>
                    {
                        angular.mock.module(($provide: angular.auto.IProvideService) =>
                        {
                            $provide.factory("configRoot", () => ({ page: {} as any } as any));
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