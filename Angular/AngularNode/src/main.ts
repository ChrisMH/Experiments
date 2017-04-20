import "zone.js";
import "reflect-metadata";

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Module } from "./Module"

import "bootstrap-css";
import "./main.css";

//enableProdMode();
platformBrowserDynamic().bootstrapModule(Module);
 