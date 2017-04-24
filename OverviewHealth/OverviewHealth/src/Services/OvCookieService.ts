import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie";
import * as moment from "moment";

import { AppSettings } from "../Services";

@Injectable()
export class OvCookieService
{
    static userNameKey: string = "ovUserName";
    static rembemberMeKey: string = "ovRememberMe";
    static identityTokenKey: string = "ovIdentityToken";

    constructor(protected appSettings: AppSettings, protected cookies: CookieService) {}

    getUserName(): string
    {
        let userName = this.cookies.get(OvCookieService.userNameKey);
        return userName || "";
    }

    setUserName(userName: string): void
    {
        this.cookies.put(OvCookieService.userNameKey, userName, { path: this.appSettings.rootUrl });
    }

    removeUserName(): void
    {
        this.cookies.remove(OvCookieService.userNameKey, { path: this.appSettings.rootUrl });
    }

    getRememberMe(): boolean
    {
        var rememberMe = this.cookies.get(OvCookieService.rembemberMeKey);
        return rememberMe && rememberMe === "true";
    }

    setRememberMe(rememberMe: boolean): void
    {
        this.cookies.put(OvCookieService.rembemberMeKey, rememberMe.toString(), { path: this.appSettings.rootUrl });
    }

    getIdentityToken(): string
    {
        return this.cookies.get(OvCookieService.identityTokenKey);
    }

    setIdentityToken(identityToken: string): void
    {
        this.cookies.put(OvCookieService.identityTokenKey,
            identityToken,
            { path: this.appSettings.rootUrl, expires: moment().add(24, 'hours').toDate() });
    }

    removeIdentityToken(): void
    {
        this.cookies.remove(OvCookieService.identityTokenKey, { path: this.appSettings.rootUrl });
    }
}
   