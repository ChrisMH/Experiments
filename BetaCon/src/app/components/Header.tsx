import * as React from "react";
import { Link } from "react-router-dom";
import * as moment from "moment";

import { AppSettings, getContainer } from "../services";

import "./Header.styl"
       
export class Header extends React.Component<any, any>
{
    protected appSettings = getContainer().get<AppSettings>(AppSettings);

    render(): JSX.Element
    {
        return ( 
            <header>
                <h2>BetaCon</h2>
                <Link to={`/`}>Main</Link>
                <Link to={`inputsetup`}>Input Setup</Link>
            </header>
        );
    }
}
