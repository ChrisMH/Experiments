import * as React from "react";
import * as moment from "moment";
import { inject } from "inversify";

import { AppSettings, IoC } from "../Services";

import "./FirstPage.css"
       
export class FirstPage extends React.Component<any, any>
{
    protected appSettings = IoC.getContainer().get<AppSettings>(AppSettings);

    render()
    {
        return ( 
            <div id="first-page">
                <h3>First Page</h3>
                <span>Time: {moment().format("MM/DD/YYYY hh:mm A")}</span><br/>
                <span>Root URL: {this.appSettings.rootUrl}</span><br />
                <span>Version: {this.appSettings.version}</span><br />
            </div>
        );
    }
}
    