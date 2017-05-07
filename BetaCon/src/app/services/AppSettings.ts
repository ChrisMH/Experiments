import { injectable, inject } from "inversify";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";

@injectable()
export class AppSettings
{
    version: string;

    constructor(@inject("configRoot") configRoot: Object)
    {
        if(configRoot.hasOwnProperty("app") && configRoot["app"].hasOwnProperty("settings"))
        {
            const appSettings = TypedJSON.parse(TypedJSON.stringify(configRoot["app"]["settings"]), InternalAppSettings);
            
            this.version = appSettings.version;
        }
    }
}


@JsonObject
class InternalAppSettings
{
    
    @JsonMember
    version: string;
}
