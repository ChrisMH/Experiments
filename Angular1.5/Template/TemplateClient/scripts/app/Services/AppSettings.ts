import { TypedJSON } from "typedjson";

import { PageConfig } from "../Models"

export class AppSettings implements ng.IServiceProvider
{
    public pageConfig: PageConfig;

    constructor() {
        if (window.hasOwnProperty("page") && window["page"].hasOwnProperty("config")) {
            this.pageConfig = TypedJSON.parse(JSON.stringify(window["page"]["config"]), PageConfig);
        }
    }

    $get(): any
    {
        return new AppSettings();
    }
}