import "reflect-metadata";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "bootstrap-css";
import "./main.css";

import { App } from "./App";

(function()
{
    function boot()
    {    
        ReactDOM.render(
            <Provider>
                <App/>
            </Provider>,
            document.getElementById("root")
        );
    };

    if(document.readyState === "complete")
        boot();
    else
        document.addEventListener("DOMContentLoaded", boot);
})();

