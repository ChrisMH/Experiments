import * as React from "react";
import * as ReactDOM from "react-dom";
import "reflect-metadata"; // required for TypedJSON

import "bootstrap-css";
import "./main.css";

import { App } from "./App";

console.log("Before ReactDOM.render", document.getElementById("root"));
ReactDOM.render(
    <App/>,
    document.getElementById("root")
);
console.log("After ReactDOM.render");
