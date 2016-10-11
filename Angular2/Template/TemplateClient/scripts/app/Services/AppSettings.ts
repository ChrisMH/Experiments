import { Injectable, Inject } from "@angular/core";
import { TypedJSON, JsonObject, JsonMember } from "typedjson";


@Injectable()
export class AppSettings
{
    originUrl: string;
    rootUrl: string;
    version: string;

    constructor(@Inject("ConfigRoot") configRoot: any)
    {
        if (configRoot.hasOwnProperty("page") && configRoot["page"].hasOwnProperty("config"))
        {
            const pageConfig = TypedJSON.parse(JSON.stringify(configRoot["page"]["config"]), PageConfig);
            this.originUrl = pageConfig.originUrl;
            this.rootUrl = pageConfig.rootUrl;
            this.version = pageConfig.version;
        }
    }
}

@JsonObject
class PageConfig
{
    @JsonMember
    originUrl: string;

    @JsonMember
    rootUrl: string;

    @JsonMember
    version: string;
}