import * as angular from "angular";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";


export class AppSettings implements angular.IServiceProvider
{
    version: string;

    static $inject = ["configRoot"];

    constructor(private configRoot: any) 
    {        
        if (configRoot.hasOwnProperty("page") && configRoot["page"].hasOwnProperty("config")) {
            let pageConfig = TypedJSON.parse(TypedJSON.stringify(configRoot["page"]["config"]), PageConfig);
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
