
import "reflect-metadata";

import { ISearchCriteria } from "../Models";
import { UrlQueryParam, UrlQueryParamKey, UrlQueryParamMetadata } from "./UrlQueryParamDecorator"

export class UrlExtensions {

    static toQueryString(searchCriteria: ISearchCriteria): string {

        let queryString: string = "";

        for (var prop in searchCriteria) {
            let urlQuery = <UrlQueryParamMetadata>Reflect.getMetadata(UrlQueryParamKey, searchCriteria, prop);
            if (urlQuery) {
                var queryValue = urlQuery.converter.toUrl(searchCriteria[prop]);
                queryString += `${queryString.length > 0 ? "&" : ""}${urlQuery.urlKey}=${queryValue}`;
            }
        }
        return queryString;
    } 

    static toSearchCriteria<TSearchCriteria extends ISearchCriteria>(queryString: string, criteriaFactory: {new() : TSearchCriteria}) : TSearchCriteria
    {
        return new criteriaFactory();
    }
}    