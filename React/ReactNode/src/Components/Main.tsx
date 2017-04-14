import * as React from "react";
import * as moment from "moment";

import { AppSettings } from "../Services";

import "./Main.css"

interface MainProps
{

}

interface MainState
{

}

export class Main extends React.Component<MainProps, MainState>
{
    appSettings: AppSettings;

    constructor()
    {
        super();
        this.appSettings = new AppSettings(window);
    }

    render()
    {
        return (
            <div id="main">
                <h1>React Template</h1>
                <span>Time: {moment().format("MM/DD/YYYY hh:mm:ss A")}</span><br/>
                <span>Version: {this.appSettings.version}</span><br />
            </div>
        );
    }
}
