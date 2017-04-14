import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";


export class AppSettings
{
    version: string;

    constructor(private configRoot: any) 
    {        
        if (configRoot.hasOwnProperty("page") && configRoot["page"].hasOwnProperty("config")) {
            let pageConfig = TypedJSON.parse(TypedJSON.stringify(configRoot["page"]["config"]), PageConfig);
            this.version = pageConfig.version;
        }
    }
}


@JsonObject
export class PageConfig 
{
    @JsonMember
    version: string;
}
