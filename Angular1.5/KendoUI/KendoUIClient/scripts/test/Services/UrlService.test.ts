
import "angular";
import "ngMock";

import * as moment from "moment";

import { MockHelpers } from "../Mocks";

import { UrlService } from "../../app/Services";
import { AssigneeSearchCriteria, PossibleAssigneeSearchCriteria } from "../../app/Models";


describe("UrlService : ",
    () =>
    {
        let rootUrl = "http://root.url/";
        beforeEach(() =>
        {
            angular.mock.module(($provide: angular.auto.IProvideService) =>
            {
                MockHelpers.installUrlService($provide);
            });
        });

        describe("AssigneeSearchCriteria : ",
            () =>
            {
                let fullCriteria: AssigneeSearchCriteria;
                let fullQueryString: string;

                let partialCriteria: AssigneeSearchCriteria;
                let partialQueryString: string;

                let emptyCriteria: AssigneeSearchCriteria;
                let emptyQueryString: string;

                beforeAll(() =>
                {
                    fullCriteria = new PossibleAssigneeSearchCriteria();
                    fullCriteria.startDate = moment().subtract(1, "year").toDate();
                    fullCriteria.endDate = moment().toDate();

                    fullQueryString =
                        `sd=${moment(fullCriteria.startDate).toISOString()}&` +
                        `ed=${moment(fullCriteria.endDate).toISOString()}`;

                    partialCriteria = new PossibleAssigneeSearchCriteria();
                    partialCriteria.startDate = moment().subtract(2, "year").toDate();

                    partialQueryString =
                        `sd=${moment(partialCriteria.startDate).toISOString()}`;

                    emptyCriteria = new PossibleAssigneeSearchCriteria();
                    emptyQueryString = "";
                });


                it("creates query string from full AssigneeSearchCriteria",
                    angular.mock.inject((urlService: UrlService) =>
                    {
                        const result = urlService.toQueryString(fullCriteria);

                        expect(result).toEqual(fullQueryString);
                    }));

                it("creates AssigneeSearchCriteria from full query string",
                    angular.mock.inject((urlService: UrlService) =>
                    {
                        const result = urlService.toSearchCriteria(fullQueryString, AssigneeSearchCriteria);

                        expect(result.startDate).toEqual(fullCriteria.startDate);
                        expect(result.endDate).toEqual(fullCriteria.endDate);
                    }));

                it("creates query string from partial AssigneeSearchCriteria",
                    angular.mock.inject((urlService: UrlService) =>
                    {
                        const result = urlService.toQueryString(partialCriteria);

                        expect(result).toEqual(partialQueryString);
                    }));

                it("creates AssigneeSearchCriteria from partial query string",
                    angular.mock.inject((urlService: UrlService) =>
                    {
                        const result = urlService.toSearchCriteria(partialQueryString, AssigneeSearchCriteria);

                        expect(result.startDate).toEqual(partialCriteria.startDate);
                        expect(result.endDate).toBeUndefined();
                    }));

                it("creates query string from empty AssigneeSearchCriteria",
                    angular.mock.inject((urlService: UrlService) =>
                    {
                        const result = urlService.toQueryString(emptyCriteria);

                        expect(result).toEqual(emptyQueryString);
                    }));

                it("creates AssigneeSearchCriteria from empty query string",
                    angular.mock.inject((urlService: UrlService) =>
                    {
                        const result = urlService.toSearchCriteria(emptyQueryString, AssigneeSearchCriteria);

                        expect(result.startDate).toBeUndefined();
                        expect(result.endDate).toBeUndefined();
                    }));
            });


        describe("PossibleAssigneeSearchCriteria : ",
            () =>
            {
                let fullCriteria: PossibleAssigneeSearchCriteria;
                let fullQueryString: string;

                let partialCriteria: PossibleAssigneeSearchCriteria;
                let partialQueryString: string;

                let emptyCriteria: PossibleAssigneeSearchCriteria;
                let emptyQueryString: string;

                beforeAll(() =>
                {
                    fullCriteria = new PossibleAssigneeSearchCriteria();
                    fullCriteria.startDate = moment().subtract(1, "year").toDate();
                    fullCriteria.endDate = moment().toDate();
                    fullCriteria.searchType = 1;
                    fullCriteria.searchAssigneeName = "oog";

                    fullQueryString =
                        `sd=${moment(fullCriteria.startDate).toISOString()}&` +
                        `ed=${moment(fullCriteria.endDate).toISOString()}&` +
                        `st=${fullCriteria.searchType}&` +
                        `san=${fullCriteria.searchAssigneeName}`;

                    partialCriteria = new PossibleAssigneeSearchCriteria();
                    partialCriteria.startDate = moment().subtract(2, "year").toDate();
                    partialCriteria.searchType = 2;

                    partialQueryString =
                        `sd=${moment(partialCriteria.startDate).toISOString()}&` +
                        `st=${partialCriteria.searchType}`;

                    emptyCriteria = new PossibleAssigneeSearchCriteria();
                    emptyQueryString = "";
                });


                it("creates query string from full PossibleAssigneeSearchCriteria",
                    angular.mock.inject((urlService: UrlService) =>
                    {
                        const result = urlService.toQueryString(fullCriteria);

                        expect(result).toEqual(fullQueryString);
                    }));

                it("creates PossibleAssigneeSearchCriteria from full query string",
                    angular.mock.inject((urlService: UrlService) =>
                    {
                        const result = urlService.toSearchCriteria(fullQueryString, PossibleAssigneeSearchCriteria);

                        expect(result.startDate).toEqual(fullCriteria.startDate);
                        expect(result.endDate).toEqual(fullCriteria.endDate);
                        expect(result.searchType).toEqual(fullCriteria.searchType);
                        expect(result.searchAssigneeName).toEqual(fullCriteria.searchAssigneeName);
                    }));

                it("creates query string from partial PossibleAssigneeSearchCriteria",
                    angular.mock.inject((urlService: UrlService) =>
                    {
                        const result = urlService.toQueryString(partialCriteria);

                        expect(result).toEqual(partialQueryString);
                    }));

                it("creates PossibleAssigneeSearchCriteria from partial query string",
                    angular.mock.inject((urlService: UrlService) =>
                    {
                        const result = urlService.toSearchCriteria(partialQueryString, PossibleAssigneeSearchCriteria);

                        expect(result.startDate).toEqual(partialCriteria.startDate);
                        expect(result.endDate).toBeUndefined();
                        expect(result.searchType).toEqual(partialCriteria.searchType);
                        expect(result.searchAssigneeName).toBeUndefined();
                    }));

                it("creates query string from empty PossibleAssigneeSearchCriteria",
                    angular.mock.inject((urlService: UrlService) =>
                    {
                        const result = urlService.toQueryString(emptyCriteria);

                        expect(result).toEqual(emptyQueryString);
                    }));

                it("creates PossibleAssigneeSearchCriteria from empty query string",
                    angular.mock.inject((urlService: UrlService) =>
                    {
                        const result = urlService.toSearchCriteria(emptyQueryString, PossibleAssigneeSearchCriteria);

                        expect(result.startDate).toBeUndefined();
                        expect(result.endDate).toBeUndefined();
                        expect(result.searchType).toBeUndefined();
                        expect(result.searchAssigneeName).toBeUndefined();
                    }));
            });
    });