System.register(["typedjson"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var typedjson_1;
    var PageConfig;
    return {
        setters:[
            function (typedjson_1_1) {
                typedjson_1 = typedjson_1_1;
            }],
        execute: function() {
            PageConfig = (function () {
                function PageConfig() {
                }
                __decorate([
                    typedjson_1.JsonMember, 
                    __metadata('design:type', String)
                ], PageConfig.prototype, "originUrl", void 0);
                __decorate([
                    typedjson_1.JsonMember, 
                    __metadata('design:type', String)
                ], PageConfig.prototype, "rootUrl", void 0);
                __decorate([
                    typedjson_1.JsonMember, 
                    __metadata('design:type', String)
                ], PageConfig.prototype, "version", void 0);
                PageConfig = __decorate([
                    typedjson_1.JsonObject, 
                    __metadata('design:paramtypes', [])
                ], PageConfig);
                return PageConfig;
            }());
            exports_1("PageConfig", PageConfig);
        }
    }
});
//# sourceMappingURL=PageConfig.js.map