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
                <SignalPath id="path-1" title="Zone 1: 4 Input Source (#2 selected), 2 Level Paging, ANC, Biamp Output" />
                <SignalPath id="path-2" title="Zone 2: 3 Input Source, 1 Level Paging, ANC, Single Output" />
            </div>
        );
    }
}
