import * as Rx from "rxjs";
import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { HeaderAccount, HeaderBranding, HeaderVersion, FirstPage, SecondPage } from "./Components";
import { AppSettings, Identity, PrincipalService } from "./Services";

import "./App.css";

export class App extends React.Component<any, any>
{
    appSettings = AppSettings.Load();

    constructor()
    {
        super();

        var ps = PrincipalService.Load();

        ps.authenticate("chogan", "round242")
            .subscribe(
                (value: Identity) =>
                {
                    let identity = value;
                    console.log("Authenticate identity:", value);

                    ps.authorize(identity.token)
                        .subscribe(
                            (value: Identity) =>
                            {
                                identity = value;
                                console.log("Authorize identity: ", value);
                            },
                            (error: any) =>
                            {
                                console.error(error);
                            },
                            () =>
                            {
                                console.log("complete");
                            }
                        );
                        
                },
                (error: any) =>
                {
                    console.error(error);
                },
                () =>
                {
                    console.log("complete");
                }
            )            
        

    }
    render(): JSX.Element
    {
        return (
            <Router>
                <div>
                    <header>
                        <HeaderAccount items={this.props}/>
                        <HeaderBranding/>
                        <HeaderVersion/>
                        <Link to={`${this.appSettings.rootUrl}/`}>Home</Link>
                        <Link to={`${this.appSettings.rootUrl}/second`}>Second</Link>
                    </header>
                    <section>
                        <Route exact path={`${this.appSettings.rootUrl}/`} component={FirstPage}/>
                        <Route path={`${this.appSettings.rootUrl}/second`} component={SecondPage}/>
                    </section>
                </div>
            </Router>
        );
    }
};
