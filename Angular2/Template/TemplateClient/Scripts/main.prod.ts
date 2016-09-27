import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Module } from "./module"

enableProdMode();
platformBrowserDynamic().bootstrapModule(Module);
 