import { Injectable, Inject } from "@angular/core";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";


@Injectable()
export class AppSettings
{
    rootUrl: string;
    version: string;

    constructor(@Inject("ConfigRoot") configRoot: any)
    {
        if (configRoot.hasOwnProperty("app") && configRoot["app"].hasOwnProperty("settings"))
        {
            const appSettings = TypedJSON.parse(JSON.stringify(configRoot["app"]["settings"]), PageConfig);
            
            this.rootUrl = appSettings.rootUrl;
            this.version = appSettings.version;
        }
    }
}

@JsonObject
class PageConfig
{
    @JsonMember
    rootUrl: string;

    @JsonMember
    version: string;
}
