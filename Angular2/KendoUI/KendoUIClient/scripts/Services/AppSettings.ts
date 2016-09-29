import { Injectable } from "@angular/core";
import { TypedJSON } from "typedjson";
import { PageConfig } from "../Models";


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