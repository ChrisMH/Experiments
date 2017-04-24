import "reflect-metadata";
import * as React from "react";
import * as ReactDOM from "react-dom";

import "bootstrap-css";
import "./main.css";

import { App } from "./App";

(function()
{
    function boot()
    {    
        ReactDOM.render(
            <App/>,
            document.getElementById("root")
        );
    };

    if(document.readyState === "complete")
        boot();
    else
        document.addEventListener("DOMContentLoaded", boot);
})();
