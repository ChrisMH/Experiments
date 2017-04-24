import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container } from "inversify";

import { FirstPage, SecondPage } from "./Components";
import { AppSettings, IoC } from "./Services";

import "./App.css";

export class App extends React.Component<any, any>
{
    protected appSettings = IoC.getContainer().get<AppSettings>(AppSettings);

    render(): JSX.Element
    {
        return (
            <Router>
                <div>
                    <header>
                        <h1>React Template</h1>
                        <Link to={`${this.appSettings.rootUrl}`}>Home</Link>
                        <Link to={`${this.appSettings.rootUrl}second`}>Second</Link>
                    </header>
                    <section>
                        <Route exact path={`${this.appSettings.rootUrl}`} component={FirstPage}/>
                        <Route path={`${this.appSettings.rootUrl}second`} component={SecondPage}/>
                    </section>
                </div>
            </Router>
        );
    }
};
