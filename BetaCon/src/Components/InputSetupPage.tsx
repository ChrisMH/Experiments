import * as React from "react";
import * as moment from "moment";

import { AppSettings } from "../Services";

import "./InputSetupPage.css"
       
export class InputSetupPage extends React.Component<any, any>
{
    appSettings = AppSettings.Load();

    render(): JSX.Element
    {
        return ( 
            <div id="input-setup-page">
                <h3>Input Setup Page</h3>
                <span>Time: {moment().format("MM/DD/YYYY hh:mm A")}</span><br/>
                <span>Root URL: {this.appSettings.rootUrl}</span><br />
                <span>Version: {this.appSettings.version}</span><br />
            </div>
        );
    }
}
    