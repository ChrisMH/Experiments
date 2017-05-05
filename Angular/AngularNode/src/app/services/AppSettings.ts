import { Injectable, Inject } from "@angular/core";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";


@Injectable()
export class AppSettings
{
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
    version: string;
}
