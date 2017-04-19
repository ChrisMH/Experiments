import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Header, MainPage, InputSetupPage } from "./Components";
import { AppSettings } from "./Services";

import "./App.css";

export class App extends React.Component<any, any>
{
    appSettings = AppSettings.Load();

    render(): JSX.Element
    {
        return (
            <Router>
                <div>
                    <Header/>
                    <section>
                        <Route exact path={`${this.appSettings.rootUrl}`} component={MainPage}/>
                        <Route path={`${this.appSettings.rootUrl}inputsetup`} component={InputSetupPage}/>
                    </section>
                </div>
            </Router>
        );
    }
};
