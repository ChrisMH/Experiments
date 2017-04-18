import * as React from "react";
import * as ReactDOM from "react-dom";
import "reflect-metadata"; // required for TypedJSON

import { Main } from "./Components";

import "bootstrap-css";
import "./main.css";

ReactDOM.render(
    (<Main/>),
    document.getElementById("root")
);
       