import * as React from "react";
import * as moment from "moment";

import { AppSettings } from "../Services";

import "./SecondPage.css"
       
export class SecondPage extends React.Component<any, any>
{
    appSettings = AppSettings.Load();

    render()
    {
        return ( 
            <div id="second-page">
                <h3>Second Page</h3>
                <span>Time: {moment().format("MM/DD/YYYY hh:mm A")}</span><br/>
                <span>Root URL: {this.appSettings.rootUrl}</span><br />
                <span>Version: {this.appSettings.version}</span><br />
            </div>
        );
    }
}
    