import "reflect-metadata"; // required for TypedJSON
import * as $ from "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";

import "bootstrap-css";
import "./main.css";

import { App } from "./App";

$(document).ready(() =>
{
    ReactDOM.render(
        <App/>,
        $("body div#root").get(0)
    );
});
