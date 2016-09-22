import { Injectable } from "@angular/core";

@Injectable()
export class PageConfig {
    private settingsRoot = {};

    constructor()
    {
        if (window.hasOwnProperty("App") && window["App"].hasOwnProperty("pageConfig"))
            this.settingsRoot = window["App"]["pageConfig"];
    }

    getOriginUrl(): string
    {
        return this.settingsRoot.hasOwnProperty("originUrl") ? this.settingsRoot["originUrl"] as string : "";
    }

    getRootUrl(): string
    {
        return this.settingsRoot.hasOwnProperty("rootUrl") ? this.settingsRoot["rootUrl"] as string : "";
    }

    getVersion(): string
    {
        return this.settingsRoot.hasOwnProperty("version") ? this.settingsRoot["version"] as string : "";
    }

    getDebug(): boolean
    {
        return this.settingsRoot.hasOwnProperty("debug") ? this.settingsRoot["debug"] as boolean : false;
    }
}