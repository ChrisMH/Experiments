import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { HeaderAccount, HeaderBranding, HeaderVersion } from "./Components";

import "./App.css";

export class App extends React.Component<any, any>
{
    render(): JSX.Element
    {
        return (
            <Router>
                <header className="main">
                    <HeaderAccount/>
                    <HeaderVersion/>
                    <HeaderBranding/>
                </header>
                <section className = "main">
                </section>
            </Router>
        );
    }
}