import { Injectable, Inject } from "@angular/core";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";


@Injectable()
export class AppSettings
{
    originUrl: string;
    rootUrl: string;
    version: string;

    constructor(@Inject("ConfigRoot") configRoot: any)
    {
        if (configRoot.hasOwnProperty("app") && configRoot["app"].hasOwnProperty("settings"))
        {
            const appSettings = TypedJSON.parse(JSON.stringify(configRoot["app"]["settings"]), PageConfig);
            
            Object.assign(this, appSettings);     
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
