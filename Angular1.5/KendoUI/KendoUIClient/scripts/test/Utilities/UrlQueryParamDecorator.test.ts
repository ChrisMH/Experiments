/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import * as moment from "moment";

import { UrlQuery } from "../../app/Utilities";

import { ISearchCriteria } from "../../app/Models";

import { AssigneeSearchCriteria, PossibleAssigneeSearchCriteria } from "../../app/Models";

export class TestClass {
    @UrlQuery.UrlQueryParam("p1u", UrlQuery.StringConverter)
    p1: string;

    @UrlQuery.UrlQueryParam("p2u", UrlQuery.IntConverter)
    p2: number;

    @UrlQuery.UrlQueryParam("p3u", UrlQuery.IsoDateConverter)
    p3: Date;
}


describe("UrlQueryParamDecorator : ",
    () =>
    {
        let testAll: TestClass;

        beforeAll(() =>
        {
            testAll = new TestClass();
            testAll.p1 = "Hey";
            testAll.p2 = 47;
            testAll.p3 = moment().toDate();
        });


        it("has metadata",
            () =>
            {
                expect(UrlQuery.getParamMap(TestClass.prototype).size).toBe(3);
            });


        it("metadata has all properties",
            () =>
            {
                const meta = UrlQuery.getParamMap(TestClass.prototype);
                let propCount = 0;

                for (let prop in testAll)
                {
                    expect(meta.get(prop)).toBeDefined();
                    propCount++;
                }

                expect(propCount).toBeGreaterThan(0);
                expect(propCount).toBe(meta.size);
            });

        it("metadata has correct propertyKeys",
            () =>
            {
                const meta = UrlQuery.getParamMap(TestClass.prototype);
                let propCount = 0;

                for (let prop in testAll)
                {
                    expect(meta.get(prop).propertyKey).toEqual(prop);
                    propCount++;
                }

                expect(propCount).toBeGreaterThan(0);
                expect(propCount).toBe(meta.size);
            });

        it("metadata has correct urlKeys",
            () =>
            {
                const meta = UrlQuery.getParamMap(TestClass.prototype);
                let propCount = 0;

                for (let prop in testAll)
                {
                    expect(meta.get(prop).urlKey).toEqual(prop + "u");
                    propCount++;
                }

                expect(propCount).toBeGreaterThan(0);
                expect(propCount).toBe(meta.size);
            });

        it("metadata has converter",
            () =>
            {
                const meta = UrlQuery.getParamMap(TestClass.prototype);
                let propCount = 0;

                for (let prop in testAll)
                {
                    expect(meta.get(prop).converter).toBeDefined();
                    propCount++;
                }

                expect(propCount).toBeGreaterThan(0);
                expect(propCount).toBe(meta.size);
            });

        it("url map matches parameter map",
            () =>
            {
                let paramMap = UrlQuery.getParamMap(TestClass.prototype);
                let urlMap = UrlQuery.getUrlMap(TestClass.prototype);

                expect(paramMap.size).toBe(3);
                expect(urlMap.size).toBe(3);

                paramMap.forEach((param) =>
                {
                    let url = urlMap.get(param.urlKey);

                    expect(param.propertyKey).toBe(url.propertyKey);
                    expect(param.urlKey).toBe(url.urlKey);
                    expect(param.converter).toBe(url.converter);
                });
            });

        it("can convert string value from URL",
            () =>
            {
                const fixture = new UrlQuery.StringConverter();

                expect(fixture.fromUrl("stringValue")).toEqual("stringValue");
            });

        it("can convert string value to URL",
            () =>
            {
                const fixture = new UrlQuery.StringConverter();

                expect(fixture.toUrl("stringValue")).toEqual("stringValue");
            });

        it("can convert number value from URL",
            () =>
            {
                const fixture = new UrlQuery.IntConverter();

                expect(fixture.fromUrl("100")).toEqual(100);
            });

        it("can convert number value to URL",
            () =>
            {
                const fixture = new UrlQuery.IntConverter();

                expect(fixture.toUrl(100)).toEqual("100");
            });

        it("can convert ISO date value from URL",
            () =>
            {
                const fixture = new UrlQuery.IsoDateConverter();

                var m = moment();

                expect(fixture.fromUrl(m.toISOString())).toEqual(m.toDate());
            });

        it("can convert ISO date value to URL",
            () =>
            {
                const fixture = new UrlQuery.IsoDateConverter();

                var m = moment();

                expect(fixture.toUrl(m.toDate())).toEqual(m.toISOString());
            });
    });