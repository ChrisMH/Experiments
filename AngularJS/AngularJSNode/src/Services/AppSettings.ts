import * as angular from "angular";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";


export class AppSettings implements angular.IServiceProvider
{
    originUrl: string;
    rootUrl: string;
    version: string;

    static $inject = ["configRoot"];

    constructor(private configRoot: any) 
    {        
        if (configRoot.hasOwnProperty("app") && configRoot["app"].hasOwnProperty("settings")) 
        {
            let appSettings = TypedJSON.parse(TypedJSON.stringify(configRoot["app"]["settings"]), PageConfig);
            
            this.originUrl = appSettings.originUrl;
            this.rootUrl = appSettings.rootUrl;
            this.version = appSettings.version;
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
    originUrl: string;

    @JsonMember
    rootUrl: string;

    @JsonMember
    version: string;
}
