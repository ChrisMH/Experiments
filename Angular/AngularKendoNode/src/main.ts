import "zone.js";   // Required for Angular
import "reflect-metadata"; // Required for typedjson
import "hammerjs";  // Required for some Kendo controls

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Module } from "./Module"

import "bootstrap-css";
import "kendo-css";

import "./main.css";

(function()
{
    function boot()
    {
        //enableProdMode();
        platformBrowserDynamic().bootstrapModule(Module);
    };

    if(document.readyState === "complete")
        boot();
    else
        document.addEventListener("DOMContentLoaded", boot);
})();
