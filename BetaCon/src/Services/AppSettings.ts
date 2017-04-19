import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";

@JsonObject
export class AppSettings
{
    @JsonMember
    rootUrl: string;
    
    @JsonMember
    version: string;

    private static appSettings: AppSettings;

    static Load(configRoot?: Object): AppSettings
    {        
        if(!configRoot)
            configRoot = window;
            
        if (AppSettings.appSettings === undefined && configRoot.hasOwnProperty("app") && configRoot["app"].hasOwnProperty("settings"))
            AppSettings.appSettings = TypedJSON.parse(TypedJSON.stringify(configRoot["app"]["settings"]), AppSettings);
        return AppSettings.appSettings;
    }

}

