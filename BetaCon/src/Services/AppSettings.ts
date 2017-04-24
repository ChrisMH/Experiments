import { injectable, inject } from "inversify";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";

@injectable()
export class AppSettings
{
    originUrl: string;
    rootUrl: string;
    version: string;

    constructor(@inject("configRoot") configRoot: Object)
    {
        if(configRoot.hasOwnProperty("app") && configRoot["app"].hasOwnProperty("settings"))
        {
            const appSettings = TypedJSON.parse(TypedJSON.stringify(configRoot["app"]["settings"]), InternalAppSettings);
            
            this.originUrl = appSettings.originUrl;
            this.rootUrl = appSettings.rootUrl;
            this.version = appSettings.version;
        }
    }
}


@JsonObject
class InternalAppSettings
{
    @JsonMember
    originUrl: string;
    
    @JsonMember
    rootUrl: string;
    
    @JsonMember
    version: string;
}
