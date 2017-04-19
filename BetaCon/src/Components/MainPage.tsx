import * as React from "react";
import * as moment from "moment";

import { SignalPath } from "../Components";

import { AppSettings } from "../Services";

import "./MainPage.css"
       
export class MainPage extends React.Component<any, any>
{
    appSettings = AppSettings.Load();

    render(): JSX.Element
    {
        return ( 
            <div id="main-page">
                <SignalPath id="path-1"/>
                <SignalPath id="path-2"/>
            </div>
        );
    }
}
