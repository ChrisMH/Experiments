import { Injectable } from "@angular/core";
import { JsonObject, JsonMember, TypedJSON } from "typedjson";

@JsonObject
export class PageConfig {
    @JsonMember
    originUrl: string;

    @JsonMember
    rootUrl: string;

    @JsonMember
    version: string;
}

@Injectable()
export class AppSettings {
    public pageConfig: PageConfig;

    constructor()
    {
        if (window.hasOwnProperty("page") && window["page"].hasOwnProperty("config")) {
            this.pageConfig = TypedJSON.parse(JSON.stringify(window["page"]["config"]), PageConfig);
        }
    } 
}