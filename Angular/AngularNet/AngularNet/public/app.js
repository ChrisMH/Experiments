webpackJsonp([1],{

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(322));
__export(__webpack_require__(323));


/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(19);
var platform_browser_1 = __webpack_require__(71);
var AppRouterModule_1 = __webpack_require__(321);
var App_1 = __webpack_require__(320);
var components_1 = __webpack_require__(125);
var services_1 = __webpack_require__(72);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            AppRouterModule_1.AppRouterModule
        ],
        declarations: [
            App_1.App, components_1.FirstPage, components_1.SecondPage
        ],
        providers: [
            { provide: "ConfigRoot", useValue: window },
            services_1.AppSettings
        ],
        bootstrap: [App_1.App]
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ 315:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(19);
var services_1 = __webpack_require__(72);
var App = (function () {
    function App(appSettings) {
        this.appSettings = appSettings;
    }
    return App;
}());
App = __decorate([
    core_1.Component({
        selector: "app",
        template: __webpack_require__(482),
        styles: [__webpack_require__(479)]
    }),
    __metadata("design:paramtypes", [services_1.AppSettings])
], App);
exports.App = App;


/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(19);
var router_1 = __webpack_require__(124);
var components_1 = __webpack_require__(125);
var routes = [
    { path: "", component: components_1.FirstPage },
    { path: "second", component: components_1.SecondPage },
    { path: "**", redirectTo: "/" }
];
var AppRouterModule = (function () {
    function AppRouterModule() {
    }
    return AppRouterModule;
}());
AppRouterModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(routes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], AppRouterModule);
exports.AppRouterModule = AppRouterModule;


/***/ }),

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(19);
var moment = __webpack_require__(1);
var services_1 = __webpack_require__(72);
var FirstPage = (function () {
    function FirstPage(appSettings) {
        this.appSettings = appSettings;
        this.loadTime = moment().toDate();
    }
    return FirstPage;
}());
FirstPage = __decorate([
    core_1.Component({
        selector: "first-page",
        template: __webpack_require__(483),
        styles: [__webpack_require__(480)],
        host: { class: "view" }
    }),
    __metadata("design:paramtypes", [services_1.AppSettings])
], FirstPage);
exports.FirstPage = FirstPage;


/***/ }),

/***/ 323:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(19);
var moment = __webpack_require__(1);
var services_1 = __webpack_require__(72);
var SecondPage = (function () {
    function SecondPage(appSettings) {
        this.appSettings = appSettings;
        this.loadTime = moment().toDate();
    }
    return SecondPage;
}());
SecondPage = __decorate([
    core_1.Component({
        selector: "second-page",
        template: __webpack_require__(484),
        styles: [__webpack_require__(481)],
        host: { class: "view" }
    }),
    __metadata("design:paramtypes", [services_1.AppSettings])
], SecondPage);
exports.SecondPage = SecondPage;


/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(19);
var typedjson_npm_1 = __webpack_require__(92);
var AppSettings = (function () {
    function AppSettings(configRoot) {
        if (configRoot.hasOwnProperty("app") && configRoot["app"].hasOwnProperty("settings")) {
            var appSettings = typedjson_npm_1.TypedJSON.parse(JSON.stringify(configRoot["app"]["settings"]), PageConfig);
            Object.assign(this, appSettings);
        }
    }
    return AppSettings;
}());
AppSettings = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject("ConfigRoot")),
    __metadata("design:paramtypes", [Object])
], AppSettings);
exports.AppSettings = AppSettings;
var PageConfig = (function () {
    function PageConfig() {
    }
    return PageConfig;
}());
__decorate([
    typedjson_npm_1.JsonMember,
    __metadata("design:type", String)
], PageConfig.prototype, "version", void 0);
PageConfig = __decorate([
    typedjson_npm_1.JsonObject
], PageConfig);


/***/ }),

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__(93);
var core_1 = __webpack_require__(19);
var AppModule_1 = __webpack_require__(312);
__webpack_require__(315);
if (false) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule_1.AppModule);


/***/ }),

/***/ 479:
/***/ (function(module, exports) {

module.exports = ":host {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  background-color: #e0e0e0;\n  overflow: hidden;\n}\n:host header {\n  background-color: #e0e0e0;\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 85px;\n  border-bottom: 1px solid #c0c0c0;\n  overflow: hidden;\n}\n:host header #header-version {\n  font-size: x-small;\n  position: absolute;\n  top: 2px;\n  right: 5px;\n}\n:host header a {\n  padding-left: 2px;\n  padding-right: 6px;\n}\n:host div#view-container {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 85px;\n  bottom: 0;\n  overflow: auto;\n}\n"

/***/ }),

/***/ 480:
/***/ (function(module, exports) {

module.exports = ":host h3 {\n  color: #f00;\n}\n"

/***/ }),

/***/ 481:
/***/ (function(module, exports) {

module.exports = ":host h3 {\n  color: #00f;\n}\n"

/***/ }),

/***/ 482:
/***/ (function(module, exports) {

module.exports = "<header> \n    <h2>Angular Raw Template</h2> \n    <a routerLink=\"/\">Home</a>\n    <a routerLink=\"/second\">Second</a>\n    <div id=\"header-version\">{{appSettings.version}}</div>\n</header>\n<div id=\"view-container\"> \n    <router-outlet></router-outlet>   \n</div> \n"

/***/ }),

/***/ 483:
/***/ (function(module, exports) {

module.exports = "<h3>First Page</h3>\n<span>Load Time: {{loadTime | date:\"MM/dd/yyyy HH:mm a\"}}</span><br/>\n<span>Version: {{appSettings.version}}</span><br/>\n "

/***/ }),

/***/ 484:
/***/ (function(module, exports) {

module.exports = "<h3>Second Page</h3>\n<span>Load Time: {{loadTime | date:\"MM/dd/yyyy HH:mm a\"}}</span><br/>\n<span>Version: {{appSettings.version}}</span><br/>\n"

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(324));


/***/ })

},[325]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9BcHBNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uc3R5bCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL0FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL0FwcFJvdXRlck1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvRmlyc3RQYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9TZWNvbmRQYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2VydmljZXMvQXBwU2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9BcHAuc3R5bCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvRmlyc3RQYWdlLnN0eWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL1NlY29uZFBhZ2Uuc3R5bCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL0FwcC5odG1sIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9GaXJzdFBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvU2Vjb25kUGFnZS5odG1sIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2VydmljZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBNEI7QUFDNUIsbUNBQTZCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0Q3QixxQ0FBeUM7QUFDekMsaURBQTJEO0FBRTNELGlEQUFvRDtBQUNwRCxxQ0FBNEI7QUFDNUIsNENBQXFEO0FBQ3JELHlDQUF5QztBQWdCekMsSUFBYSxTQUFTO0lBQXRCO0lBQXlCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUM7QUFBYixTQUFTO0lBZHJC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OztBQ1pwRCx5QkFBeUIsdUJBQXVCLGNBQWMsYUFBYSxlQUFlLGdCQUFnQiw4QkFBOEIscUJBQXFCLEdBQUcsZ0JBQWdCLDhCQUE4QixvQkFBb0IsWUFBWSxXQUFXLGdCQUFnQixpQkFBaUIscUNBQXFDLHFCQUFxQixHQUFHLGdDQUFnQyx1QkFBdUIsdUJBQXVCLGFBQWEsZUFBZSxHQUFHLGtCQUFrQixzQkFBc0IsdUJBQXVCLEdBQUcsNEJBQTRCLHVCQUF1QixZQUFZLGFBQWEsY0FBYyxjQUFjLG1CQUFtQixHQUFHLEc7Ozs7Ozs7QUNBcG9CLDRCQUE0QixnQkFBZ0IsR0FBRyxHOzs7Ozs7O0FDQS9DLDRCQUE0QixnQkFBZ0IsR0FBRyxHOzs7Ozs7O0FDQS9DLDhLQUE4SyxxQkFBcUIsbUc7Ozs7Ozs7QUNBbk0sMERBQTBELHdDQUF3QywrQkFBK0IscUJBQXFCLGdCOzs7Ozs7O0FDQXRKLDJEQUEyRCx3Q0FBd0MsK0JBQStCLHFCQUFxQixlOzs7Ozs7Ozs7Ozs7O0FDQXZKLG1DQUE4QiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tIFwiLi9GaXJzdFBhZ2VcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1NlY29uZFBhZ2VcIjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vYW5ndWxhcjItdGVtcGxhdGUtbG9hZGVyIS4vc3JjL2FwcC9jb21wb25lbnRzL2luZGV4LnRzIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9ICBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuXG5pbXBvcnQgeyBBcHBSb3V0ZXJNb2R1bGUgfSBmcm9tIFwiLi9BcHBSb3V0ZXJNb2R1bGVcIjtcbmltcG9ydCB7IEFwcCB9IGZyb20gXCIuL0FwcFwiO1xuaW1wb3J0IHsgRmlyc3RQYWdlLCBTZWNvbmRQYWdlIH0gZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgQXBwU2V0dGluZ3MgfSBmcm9tIFwiLi9zZXJ2aWNlc1wiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQnJvd3Nlck1vZHVsZSxcbiAgICAgICAgQXBwUm91dGVyTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgIEFwcCwgRmlyc3RQYWdlLCBTZWNvbmRQYWdlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBcIkNvbmZpZ1Jvb3RcIiwgdXNlVmFsdWU6IHdpbmRvdyB9LFxuICAgICAgICBBcHBTZXR0aW5nc1xuICAgIF0sXG4gICAgYm9vdHN0cmFwOiBbIEFwcCBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vYW5ndWxhcjItdGVtcGxhdGUtbG9hZGVyIS4vc3JjL2FwcC9BcHBNb2R1bGUudHMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21haW4uc3R5bFxuLy8gbW9kdWxlIGlkID0gMzE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IEFwcFNldHRpbmdzIH0gZnJvbSBcIi4vc2VydmljZXNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiYXBwXCIsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vQXBwLmh0bWwnKSxcbiAgICBzdHlsZXM6IFtyZXF1aXJlKCcuL0FwcC5zdHlsJyldXG59KVxuZXhwb3J0IGNsYXNzIEFwcCB7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFwcFNldHRpbmdzOiBBcHBTZXR0aW5ncykge31cbn1cblxuICAgICAgXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9hbmd1bGFyMi10ZW1wbGF0ZS1sb2FkZXIhLi9zcmMvYXBwL0FwcC50cyIsImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9ICBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IEZpcnN0UGFnZSwgU2Vjb25kUGFnZSB9IGZyb20gXCIuL2NvbXBvbmVudHNcIjtcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBcbltcbiAgICB7IHBhdGg6IFwiXCIsIGNvbXBvbmVudDogRmlyc3RQYWdlIH0sXG4gICAgeyBwYXRoOiBcInNlY29uZFwiLCBjb21wb25lbnQ6IFNlY29uZFBhZ2UgfSxcbiAgICB7IHBhdGg6IFwiKipcIiwgcmVkaXJlY3RUbzogXCIvXCIgfVxuXTtcblxuQE5nTW9kdWxlKFxue1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBSb3V0ZXJNb2R1bGVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcFJvdXRlck1vZHVsZSB7fVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9hbmd1bGFyMi10ZW1wbGF0ZS1sb2FkZXIhLi9zcmMvYXBwL0FwcFJvdXRlck1vZHVsZS50cyIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuXG5pbXBvcnQgeyBBcHBTZXR0aW5ncyB9IGZyb20gXCIuLi9zZXJ2aWNlc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJmaXJzdC1wYWdlXCIsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vRmlyc3RQYWdlLmh0bWwnKSxcbiAgICBzdHlsZXM6IFtyZXF1aXJlKCcuL0ZpcnN0UGFnZS5zdHlsJyldLFxuICAgIGhvc3Q6IHsgY2xhc3M6IFwidmlld1wiIH1cbn0pXG5cbmV4cG9ydCBjbGFzcyBGaXJzdFBhZ2VcbntcbiAgICBwcm90ZWN0ZWQgbG9hZFRpbWU6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYXBwU2V0dGluZ3M6IEFwcFNldHRpbmdzKVxuICAgIHtcbiAgICAgICAgdGhpcy5sb2FkVGltZSA9IG1vbWVudCgpLnRvRGF0ZSgpO1xuICAgIH1cbn1cbiAgIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vYW5ndWxhcjItdGVtcGxhdGUtbG9hZGVyIS4vc3JjL2FwcC9jb21wb25lbnRzL0ZpcnN0UGFnZS50cyIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuXG5pbXBvcnQgeyBBcHBTZXR0aW5ncyB9IGZyb20gXCIuLi9zZXJ2aWNlc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzZWNvbmQtcGFnZVwiLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL1NlY29uZFBhZ2UuaHRtbCcpLFxuICAgIHN0eWxlczogW3JlcXVpcmUoJy4vU2Vjb25kUGFnZS5zdHlsJyldLFxuICAgIGhvc3Q6IHsgY2xhc3M6IFwidmlld1wiIH1cbn0pXG4gXG5leHBvcnQgY2xhc3MgU2Vjb25kUGFnZVxue1xuICAgIHByb3RlY3RlZCBsb2FkVGltZTogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhcHBTZXR0aW5nczogQXBwU2V0dGluZ3MpXG4gICAge1xuICAgICAgICB0aGlzLmxvYWRUaW1lID0gbW9tZW50KCkudG9EYXRlKCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9hbmd1bGFyMi10ZW1wbGF0ZS1sb2FkZXIhLi9zcmMvYXBwL2NvbXBvbmVudHMvU2Vjb25kUGFnZS50cyIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBUeXBlZEpTT04sIEpzb25PYmplY3QsIEpzb25NZW1iZXIgfSBmcm9tIFwidHlwZWRqc29uLW5wbVwiO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcHBTZXR0aW5nc1xue1xuICAgIHZlcnNpb246IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoXCJDb25maWdSb290XCIpIGNvbmZpZ1Jvb3Q6IGFueSlcbiAgICB7XG4gICAgICAgIGlmIChjb25maWdSb290Lmhhc093blByb3BlcnR5KFwiYXBwXCIpICYmIGNvbmZpZ1Jvb3RbXCJhcHBcIl0uaGFzT3duUHJvcGVydHkoXCJzZXR0aW5nc1wiKSlcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSBUeXBlZEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uZmlnUm9vdFtcImFwcFwiXVtcInNldHRpbmdzXCJdKSwgUGFnZUNvbmZpZyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXBwU2V0dGluZ3MpOyAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBKc29uT2JqZWN0XG5jbGFzcyBQYWdlQ29uZmlnXG57XG4gICAgQEpzb25NZW1iZXJcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2FuZ3VsYXIyLXRlbXBsYXRlLWxvYWRlciEuL3NyYy9hcHAvc2VydmljZXMvQXBwU2V0dGluZ3MudHMiLCJpbXBvcnQgeyBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJztcbmltcG9ydCB7IGVuYWJsZVByb2RNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFwcE1vZHVsZSB9IGZyb20gJy4vYXBwL0FwcE1vZHVsZSc7XG5cbmltcG9ydCBcIi4vbWFpbi5zdHlsXCI7XG5cbmlmIChwcm9jZXNzLmVudi5FTlYgPT09ICdwcm9kdWN0aW9uJykgXG57XG4gICAgZW5hYmxlUHJvZE1vZGUoKTtcbn1cblxucGxhdGZvcm1Ccm93c2VyRHluYW1pYygpLmJvb3RzdHJhcE1vZHVsZShBcHBNb2R1bGUpO1xuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vYW5ndWxhcjItdGVtcGxhdGUtbG9hZGVyIS4vc3JjL21haW4udHMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiOmhvc3Qge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMHB4O1xcbiAgdG9wOiAwcHg7XFxuICByaWdodDogMHB4O1xcbiAgYm90dG9tOiAwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlMGUwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuOmhvc3QgaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMGUwZTA7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDg1cHg7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2MwYzBjMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbjpob3N0IGhlYWRlciAjaGVhZGVyLXZlcnNpb24ge1xcbiAgZm9udC1zaXplOiB4LXNtYWxsO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAycHg7XFxuICByaWdodDogNXB4O1xcbn1cXG46aG9zdCBoZWFkZXIgYSB7XFxuICBwYWRkaW5nLWxlZnQ6IDJweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDZweDtcXG59XFxuOmhvc3QgZGl2I3ZpZXctY29udGFpbmVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHRvcDogODVweDtcXG4gIGJvdHRvbTogMDtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2FwcC9BcHAuc3R5bFxuLy8gbW9kdWxlIGlkID0gNDc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0gXCI6aG9zdCBoMyB7XFxuICBjb2xvcjogI2YwMDtcXG59XFxuXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9GaXJzdFBhZ2Uuc3R5bFxuLy8gbW9kdWxlIGlkID0gNDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0gXCI6aG9zdCBoMyB7XFxuICBjb2xvcjogIzAwZjtcXG59XFxuXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9TZWNvbmRQYWdlLnN0eWxcbi8vIG1vZHVsZSBpZCA9IDQ4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGhlYWRlcj4gXFxuICAgIDxoMj5Bbmd1bGFyIFJhdyBUZW1wbGF0ZTwvaDI+IFxcbiAgICA8YSByb3V0ZXJMaW5rPVxcXCIvXFxcIj5Ib21lPC9hPlxcbiAgICA8YSByb3V0ZXJMaW5rPVxcXCIvc2Vjb25kXFxcIj5TZWNvbmQ8L2E+XFxuICAgIDxkaXYgaWQ9XFxcImhlYWRlci12ZXJzaW9uXFxcIj57e2FwcFNldHRpbmdzLnZlcnNpb259fTwvZGl2PlxcbjwvaGVhZGVyPlxcbjxkaXYgaWQ9XFxcInZpZXctY29udGFpbmVyXFxcIj4gXFxuICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD4gICBcXG48L2Rpdj4gXFxuXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hcHAvQXBwLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDQ4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGgzPkZpcnN0IFBhZ2U8L2gzPlxcbjxzcGFuPkxvYWQgVGltZToge3tsb2FkVGltZSB8IGRhdGU6XFxcIk1NL2RkL3l5eXkgSEg6bW0gYVxcXCJ9fTwvc3Bhbj48YnIvPlxcbjxzcGFuPlZlcnNpb246IHt7YXBwU2V0dGluZ3MudmVyc2lvbn19PC9zcGFuPjxici8+XFxuIFwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvRmlyc3RQYWdlLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDQ4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGgzPlNlY29uZCBQYWdlPC9oMz5cXG48c3Bhbj5Mb2FkIFRpbWU6IHt7bG9hZFRpbWUgfCBkYXRlOlxcXCJNTS9kZC95eXl5IEhIOm1tIGFcXFwifX08L3NwYW4+PGJyLz5cXG48c3Bhbj5WZXJzaW9uOiB7e2FwcFNldHRpbmdzLnZlcnNpb259fTwvc3Bhbj48YnIvPlxcblwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvU2Vjb25kUGFnZS5odG1sXG4vLyBtb2R1bGUgaWQgPSA0ODRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0ICogZnJvbSBcIi4vQXBwU2V0dGluZ3NcIjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vYW5ndWxhcjItdGVtcGxhdGUtbG9hZGVyIS4vc3JjL2FwcC9zZXJ2aWNlcy9pbmRleC50cyJdLCJzb3VyY2VSb290IjoiIn0=