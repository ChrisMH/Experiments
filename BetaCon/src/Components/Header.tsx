import * as React from "react";
import { Link } from "react-router-dom";
import * as moment from "moment";

import { AppSettings, IoC } from "../Services";

import "./Header.css"
       
export class Header extends React.Component<any, any>
{
    protected appSettings = IoC.getContainer().get<AppSettings>(AppSettings);

    render(): JSX.Element
    {
        return ( 
            <header>
                <h2>BetaCon</h2>
                <Link to={`${this.appSettings.rootUrl}`}>Main</Link>
                <Link to={`${this.appSettings.rootUrl}inputsetup`}>Input Setup</Link>
            </header>
        );
    }
}
