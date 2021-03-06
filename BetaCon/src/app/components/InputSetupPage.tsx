import * as React from "react";
import * as moment from "moment";

import { AppSettings, getContainer } from "../services";

import "./InputSetupPage.styl"
       
export class InputSetupPage extends React.Component<any, any>
{
    protected appSettings = getContainer().get<AppSettings>(AppSettings);

    render(): JSX.Element
    {
        return ( 
            <div id="input-setup-page">
                <h3>Input Setup Page</h3>
                <span>Time: {moment().format("MM/DD/YYYY hh:mm A")}</span><br/>
                <span>Version: {this.appSettings.version}</span><br />
            </div>
        );
    }
}
    