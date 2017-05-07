import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container } from "inversify";

import { Header, MainPage, InputSetupPage } from "./components";
import { AppSettings, getContainer } from "./services";

import "./App.styl";

export class App extends React.Component<any, any>
{
    protected appSettings = getContainer().get<AppSettings>(AppSettings);

    render(): JSX.Element
    {
        return (
            <Router>
                <div>
                    <Header/>
                    <section>
                        <Route exact path={`/`} component={MainPage}/>
                        <Route path={`/inputsetup`} component={InputSetupPage}/>
                    </section>
                </div>
            </Router>
        );
    }
};
