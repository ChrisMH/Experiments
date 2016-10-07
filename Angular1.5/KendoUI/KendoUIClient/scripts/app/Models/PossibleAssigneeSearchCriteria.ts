﻿
import { UrlQuery } from "../Utilities"
import { ISearchCriteria } from "../Models"

export class PossibleAssigneeSearchCriteria implements ISearchCriteria
{ 
    @UrlQuery.UrlQueryParam("sd", UrlQuery.IsoDateConverter)
    startDate: Date;
    
    @UrlQuery.UrlQueryParam("ed", UrlQuery.IsoDateConverter)
    endDate: Date;

    @UrlQuery.UrlQueryParam("st", UrlQuery.IntConverter)
    searchType: number;

    @UrlQuery.UrlQueryParam("san", UrlQuery.StringConverter)
    searchAssigneeName: string;
}


