import * as angular from "angular";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";


export class AppSettings implements angular.IServiceProvider
{
    version: string;

    static $inject = ["configRoot"];

    constructor(private configRoot: any) 
    {        
        if (configRoot.hasOwnProperty("app") && configRoot["app"].hasOwnProperty("settings")) 
        {
            let pageConfig = TypedJSON.parse(TypedJSON.stringify(configRoot["app"]["settings"]), PageConfig);
            
            this.version = pageConfig.version;
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
}
