import "core-js/client/shim";
import "zone.js/dist/zone";
import "reflect-metadata/Reflect.js";

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Module } from "./Module"

platformBrowserDynamic().bootstrapModule(Module);
 