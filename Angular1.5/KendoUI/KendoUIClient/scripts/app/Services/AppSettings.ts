import { TypedJSON } from "typedjson";

import { PageConfig } from "../Models"

export class AppSettings implements ng.IServiceProvider
{
    public pageConfig: PageConfig;

    static $inject = ["configRoot"];

    constructor(private configRoot: any) 
    {
        if (configRoot.hasOwnProperty("page") && configRoot["page"].hasOwnProperty("config")) {
            this.pageConfig = TypedJSON.parse(TypedJSON.stringify(configRoot["page"]["config"]), PageConfig);
        }
    }

    $get(): any
    {
        return new AppSettings(this.configRoot);
    }
}