import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";

@JsonObject
export class AppSettings
{
    @JsonMember
    originUrl: string;
    
    @JsonMember
    rootUrl: string;
    
    @JsonMember
    version: string;

    private static appSettings: AppSettings;

    static Load(configRoot?: Object, reload?: boolean): AppSettings
    {        
        if(!configRoot)
            configRoot = window;
            
        if (AppSettings.appSettings === undefined || reload)
        {
            if(configRoot.hasOwnProperty("app") && configRoot["app"].hasOwnProperty("settings"))
                AppSettings.appSettings = TypedJSON.parse(TypedJSON.stringify(configRoot["app"]["settings"]), AppSettings);
            else
                AppSettings.appSettings = new AppSettings();
        }

        return AppSettings.appSettings;
    }

}

