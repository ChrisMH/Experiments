import "zone.js";
import "reflect-metadata";

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Module } from "./Module"

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
 