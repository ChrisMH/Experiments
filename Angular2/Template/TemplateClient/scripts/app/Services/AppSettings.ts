import { Injectable, Inject } from "@angular/core";
import { TypedJSON } from "typedjson";
import { PageConfig } from "../Models";


@Injectable()
export class AppSettings {
    public pageConfig: PageConfig;

    constructor(@Inject("ConfigRoot") configRoot: any)
    {
        if (configRoot.hasOwnProperty("page") && configRoot["page"].hasOwnProperty("config")) {
            this.pageConfig = TypedJSON.parse(JSON.stringify(configRoot["page"]["config"]), PageConfig);
        }
    } 
}