import * as angular from "angular";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";


export class AppSettings implements angular.IServiceProvider
{
    version: string;
    rootUrl: string;

    static $inject = ["configRoot"];

    constructor(private configRoot: any) 
    {        
        if (configRoot.hasOwnProperty("app") && configRoot["app"].hasOwnProperty("settings")) 
        {
            let appSettings = TypedJSON.parse(TypedJSON.stringify(configRoot["app"]["settings"]), PageConfig);
            
            this.version = appSettings.version;
            this.rootUrl = appSettings.rootUrl;
        }
    }

    $get(): any
    {
        return new AppSettings(this.configRoot);
    }
}


@JsonObject
export class PageConfig 
{
    @JsonMember
    version: string;

    @JsonMember
    rootUrl: string;
}
