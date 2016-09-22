import { Injectable } from "@angular/core";

@Injectable()
export class PageConfig {
    private pageConfig = {};

    constructor()
    {
        if (window.hasOwnProperty("app") && window["app"].hasOwnProperty("pageConfig"))
            this.pageConfig = window["app"]["pageConfig"];
    }

    getOriginUrl(): string
    {
        return this.pageConfig.hasOwnProperty("originUrl") ? this.pageConfig["originUrl"] as string : "";
    }

    getRootUrl(): string
    {
        return this.pageConfig.hasOwnProperty("rootUrl") ? this.pageConfig["rootUrl"] as string : "";
    }

    getVersion(): string
    {
        return this.pageConfig.hasOwnProperty("version") ? this.pageConfig["version"] as string : "";
    }

    getDebug(): boolean
    {
        return this.pageConfig.hasOwnProperty("debug") ? this.pageConfig["debug"] as boolean : false;
    }
}