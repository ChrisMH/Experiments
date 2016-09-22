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
        if (window.hasOwnProperty("app") && window["app"].hasOwnProperty("pageConfig"))
            this.config = window["app"]["pageConfig"] as IPageConfig;
    } 
}