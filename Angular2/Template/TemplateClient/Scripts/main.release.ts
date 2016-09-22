import "core-js/client/shim";
import "zone.js/dist/zone";
import "reflect-metadata/Reflect.js";

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Module } from "./Module"

enableProdMode();
platformBrowserDynamic().bootstrapModule(Module);
 