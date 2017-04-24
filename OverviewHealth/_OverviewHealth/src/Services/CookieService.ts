import * as moment from "moment";
let cookie = require("react-cookie"); // No typings available

import { AppSettings } from "../Services";

export class CookieService
{
    static userNameKey: string = "ovUserName";
    static rembemberMeKey: string = "ovRememberMe";
    static identityTokenKey: string = "ovIdentityToken";

    appSettings = AppSettings.Load();

    private static cookieService: CookieService;
    static Load(): CookieService
    {
        if(!CookieService.cookieService)
            CookieService.cookieService = new CookieService();
        return CookieService.cookieService;
    }

    private constructor() {}

    getUserName(): string 
    {        
        let userName = cookie.load(CookieService.userNameKey);
        return userName || "";
    }

    setUserName(userName: string): void
    {
        cookie.save(CookieService.userNameKey, userName, { path: this.appSettings.rootUrl });
    }

    removeUserName(): void
    {
        cookie.remove(CookieService.userNameKey, { path: this.appSettings.rootUrl });
    }

    getRememberMe(): boolean
    {
        var rememberMe = cookie.load(CookieService.rembemberMeKey);
        return rememberMe && rememberMe === "true";
    }

    setRememberMe(rememberMe: boolean): void
    {
        cookie.save(CookieService.rembemberMeKey, rememberMe.toString(), { path: this.appSettings.rootUrl });
    }

    getIdentityToken(): string
    {
        return cookie.load(CookieService.identityTokenKey);
    }

    setIdentityToken(identityToken: string): void
    {
        cookie.save(CookieService.identityTokenKey, identityToken, { path: this.appSettings.rootUrl, expires: moment().add(24, 'hours').toDate() });
    }

    removeIdentityToken(): void
    {
        cookie.remove(CookieService.identityTokenKey, { path: this.appSettings.rootUrl });
    }

}
