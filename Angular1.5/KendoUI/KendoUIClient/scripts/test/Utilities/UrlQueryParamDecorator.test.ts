/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import * as moment from "moment";
import "reflect-metadata";

import { UrlQueryParam, UrlQueryParamKey, UrlQueryParamMetadata, StringConverter, IntConverter, IsoDateConverter } from "../../app/Utilities";

class TestClass {
    @UrlQueryParam("p1u", StringConverter)
    p1: string;
    
    @UrlQueryParam("p2u", IntConverter)
    p2: number;

    @UrlQueryParam("p3u", IsoDateConverter)
    p3: Date;
}

 
describe("UrlQueryParamDecorator : ",
    () => {

        let testAll: TestClass;

        beforeAll(() => {
            testAll = new TestClass();
            testAll.p1 = "Hey";
            testAll.p2 = 47;
            testAll.p3 = moment().toDate();
        });

        it("has metadata",
            () => {

                let withMetadata = new Array<string>();

                for (let p in testAll) {
                    let urlQuery = <UrlQueryParamMetadata>Reflect.getMetadata(UrlQueryParamKey, testAll, p);
                    if (urlQuery) withMetadata.push(p);
                }
                expect(withMetadata.length).toEqual(3);
            });

        it("has correct metadata values",
            () => {
                for (let p in testAll) {
                    let urlQuery = <UrlQueryParamMetadata>Reflect.getMetadata(UrlQueryParamKey, testAll, p);
                    expect(urlQuery.urlKey).toEqual(p + "u");
                }
            });

        it("has metadata only for defined properties",
            () => {
                let testOne = new TestClass();
                testOne.p1 = "hey";

                let withMetadata = new Array<string>();
                for (let p in testOne) {
                    let urlQuery = <UrlQueryParamMetadata>Reflect.getMetadata(UrlQueryParamKey, testAll, p);
                    if (urlQuery) withMetadata.push(p);
                }

                expect(withMetadata.length).toEqual(1);
                expect(withMetadata[0]).toEqual("p1");
            });


        it("can convert string value from URL",
            () => {
                let urlQuery = <UrlQueryParamMetadata>Reflect.getMetadata(UrlQueryParamKey, testAll, "p1");

                expect(urlQuery.converter.fromUrl("stringValue")).toEqual("stringValue");
            });

        it("can convert string value to URL",
            () => {
                
                let urlQuery = <UrlQueryParamMetadata>Reflect.getMetadata(UrlQueryParamKey, testAll, "p1");
                
                expect(urlQuery.converter.toUrl("stringValue")).toEqual("stringValue");
            });

        it("can convert number value from URL",
            () => {
                let urlQuery = <UrlQueryParamMetadata>Reflect.getMetadata(UrlQueryParamKey, testAll, "p2");

                expect(urlQuery.converter.fromUrl("100")).toEqual(100);
            });

        it("can convert number value to URL",
            () => {
                
                let urlQuery = <UrlQueryParamMetadata>Reflect.getMetadata(UrlQueryParamKey, testAll, "p2");
                
                expect(urlQuery.converter.toUrl(100)).toEqual("100");
            });

        it("can convert ISO date value from URL",
            () => {
                let urlQuery = <UrlQueryParamMetadata>Reflect.getMetadata(UrlQueryParamKey, testAll, "p3");

                var m = moment();

                expect(urlQuery.converter.fromUrl(m.toISOString())).toEqual(m.toDate());
            });

        it("can convert ISO date value to URL",
            () => {
                
                let urlQuery = <UrlQueryParamMetadata>Reflect.getMetadata(UrlQueryParamKey, testAll, "p3");
                
                var m = moment();

                expect(urlQuery.converter.toUrl(m.toDate())).toEqual(m.toISOString());
            });

    });