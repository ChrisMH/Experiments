import * as React from "react";

import { AppSettings } from "../Services";

import "./HeaderBranding.css";

export class HeaderBranding extends React.Component<any, any>
{
    appSettings = AppSettings.Load();

    render()
    {
        return (
            <div className="header-branding" style={{backgroundImage: `url(${this.appSettings.rootUrl}img/OverviewBanner.png)`}}>
                <a href='#'></a>
            </div>
        );
    }
} 
