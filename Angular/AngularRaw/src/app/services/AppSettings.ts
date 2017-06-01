import { Injectable, Inject } from "@angular/core";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";

import { WINDOW } from "./";


@Injectable()
export class AppSettings
{
    version: string;

    constructor(@Inject(WINDOW) window: Window)
    {
        if (window.hasOwnProperty("app") && window["app"].hasOwnProperty("settings"))
        {
            const appSettings = TypedJSON.parse(JSON.stringify(window["app"]["settings"]), PageConfig);
            
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
 