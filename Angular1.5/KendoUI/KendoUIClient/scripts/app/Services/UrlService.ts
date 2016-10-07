
import { AppSettings } from "../Services";
import { ISearchCriteria } from "../Models";
import { UrlQuery } from "../Utilities"

export class UrlService implements ng.IServiceProvider
{
    static $inject = ["appSettings"];

    constructor(private appSettings: AppSettings)
    {
    }

    toQueryString(searchCriteria: ISearchCriteria): string
    {
        let queryString = "";
        const paramMap = UrlQuery.getParamMap(searchCriteria);

        for (let prop in searchCriteria)
        {
            if (searchCriteria.hasOwnProperty(prop))
            {
                const paramMeta = paramMap.get(prop) as UrlQuery.UrlQueryParamMetadata;
                if (!paramMeta)
                    continue;

                const queryValue = paramMeta.converter.toUrl(searchCriteria[prop]);
                queryString += `${queryString.length > 0 ? "&" : ""}${paramMeta.urlKey}=${queryValue}`;
            }
        }
        return queryString;
    }

    toSearchCriteria<TSearchCriteria extends ISearchCriteria>(queryString: string, criteriaFactory: { new(): TSearchCriteria }): TSearchCriteria
    {
        const searchCriteria = new criteriaFactory();
        const urlMap = UrlQuery.getUrlMap(searchCriteria);

        const queryParts = queryString.split("&");
        queryParts.forEach(queryPart =>
        {
            const keyValue = queryPart.split("=");
            if (keyValue.length !== 2)
                return;

            var paramMeta = urlMap.get(keyValue[0]);
            if (!paramMeta)
                return;

            searchCriteria[paramMeta.propertyKey] = paramMeta.converter.fromUrl(keyValue[1]);
        });

        return searchCriteria;
    }

    $get(): any
    {
        return new AppSettings(this.appSettings);
    }
}