import "reflect-metadata";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "bootstrap-css";
import "./main.css";

import { App } from "./App";

let store: 

function boot()
{    
    ReactDOM.render(
        <Provider store={store}>
            <App></App>
        </Provider>,
        document.getElementById("root")
    );
};

if(document.readyState === "complete")
    boot();
else
    document.addEventListener("DOMContentLoaded", boot);
