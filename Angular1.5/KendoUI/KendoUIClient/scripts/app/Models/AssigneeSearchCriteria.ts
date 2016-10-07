
import { UrlQuery } from "../Utilities"
import { ISearchCriteria } from "../Models"

export class AssigneeSearchCriteria implements ISearchCriteria
{ 
    @UrlQuery.UrlQueryParam("sd", UrlQuery.IsoDateConverter)
    startDate: Date;
    
    @UrlQuery.UrlQueryParam("ed", UrlQuery.IsoDateConverter)
    endDate: Date;
    
}
