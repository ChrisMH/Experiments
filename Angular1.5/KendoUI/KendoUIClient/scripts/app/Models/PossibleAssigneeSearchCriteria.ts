import { UrlQueryParam, StringConverter, IntConverter, IsoDateConverter } from "../Utilities";
import { ISearchCriteria } from "./ISearchCriteria";

export class PossibleAssigneeSearchCriteria implements ISearchCriteria
{
    @UrlQueryParam("sd", IsoDateConverter)
    startDate: Date;

    @UrlQueryParam("ed", IsoDateConverter)
    endDate: Date;

    @UrlQueryParam("st", IntConverter)
    searchType: number;

    @UrlQueryParam("san", StringConverter)
    searchAssigneeName: string;
}

