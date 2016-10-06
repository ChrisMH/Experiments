/// <reference path="../../../typings/globals/jasmine/index.d.ts" />

import * as moment from "moment";
import { UrlExtensions } from "../../app/Utilities";
import { PossibleAssigneeSearchCriteria } from "../../app/Models";

describe("UrlExtensions : ",
    () => {


        describe("PossibleAssigneeSearchCriteria : ",
            () => {
                let testFull: PossibleAssigneeSearchCriteria;
                let testFullQueryString: string;

                beforeAll(() => {
                    testFull = new PossibleAssigneeSearchCriteria();
                    testFull.startDate = moment().subtract(1, "year").toDate();
                    testFull.endDate = moment().toDate();
                    testFull.searchType = 1;
                    testFull.searchAssigneeName = "oog";

                    testFullQueryString = 
                        `sd=${moment(testFull.startDate).toISOString()}&` +
                        `ed=${moment(testFull.endDate).toISOString()}&` +
                        `st=${testFull.searchType}&` +
                        `san=${testFull.searchAssigneeName}`;
                });
                

                it("creates query string from PossibleAssigneeSearchCriteria",
                    () => {
                        let result = UrlExtensions.toQueryString(testFull);

                        expect(result).toEqual(testFullQueryString);
                    });

                it("creates PossibleAssigneeSearchCriteria from query string",
                    () => {
                        let result = UrlExtensions.toSearchCriteria(testFullQueryString, PossibleAssigneeSearchCriteria);

                        expect(result.startDate).toEqual(testFull.startDate);
                        expect(result.endDate).toEqual(testFull.endDate);
                        expect(result.searchType).toEqual(testFull.searchType);
                        expect(result.searchAssigneeName).toEqual(testFull.searchAssigneeName);
                    });
            });
    });
