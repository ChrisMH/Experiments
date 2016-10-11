import { TypedJSON, JsonObject, JsonMember } from "typedjson";


export class AppSettings implements ng.IServiceProvider
{
    originUrl: string;
    rootUrl: string;
    version: string;

    static $inject = ["configRoot"];

    constructor(private configRoot: any) 
    {
        if (configRoot.hasOwnProperty("page") && configRoot["page"].hasOwnProperty("config")) {
            let pageConfig = TypedJSON.parse(TypedJSON.stringify(configRoot["page"]["config"]), PageConfig);

            this.originUrl = pageConfig.originUrl;
            this.rootUrl = pageConfig.rootUrl;
            this.version = pageConfig.version;
        }
    }

    $get(): any
    {
        return new AppSettings(this.configRoot);
    }
}


@JsonObject
export class PageConfig {
    @JsonMember
    originUrl: string;

    @JsonMember
    rootUrl: string;

    @JsonMember
    version: string;
}
