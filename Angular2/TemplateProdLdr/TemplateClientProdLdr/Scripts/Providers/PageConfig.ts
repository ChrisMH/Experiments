import { Injectable } from "@angular/core";

export interface IPageConfig {
    originUrl: string;
    rootUrl: string;
    version: string;
}

@Injectable()
export class PageConfigProvider {
    public config: IPageConfig;

    constructor()
    {
        if (window.hasOwnProperty("page") && window["page"].hasOwnProperty("config"))
            this.config = window["page"]["config"] as IPageConfig;
    } 
}