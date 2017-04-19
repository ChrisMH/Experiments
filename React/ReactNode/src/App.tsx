import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { FirstPage, SecondPage } from "./Components";

export class App extends React.Component<any, any>
{
    render(): JSX.Element
    {
        return (
            <Router>
                <div>
                    <header>
                        <h1>React Template</h1>
                        <Link to="/">Home</Link>
                        <Link to="/second">Second</Link>
                    </header>
                    <section>
                        <Route exact path="/" component={FirstPage}/>
                        <Route path="/second" component={SecondPage}/>
                    </section>
                </div>
            </Router>
        );
    }
};
