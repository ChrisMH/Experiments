import * as React from "react";

import { AppSettings } from "../Services";

import "./HeaderVersion.css";

export class HeaderVersion extends React.Component<any, any>
{
    appSettings = AppSettings.Load();

    render()
    {
        return (
            <div className="header-version">{this.appSettings.version}</div>
        );
    }
} 