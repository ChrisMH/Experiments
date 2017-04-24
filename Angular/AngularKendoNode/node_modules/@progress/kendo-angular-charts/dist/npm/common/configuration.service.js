"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/auditTime");
/**
 * @hidden
 */
exports.THROTTLE_MS = 1000 / 60;
/**
 * @hidden
 */
var Change = (function () {
    function Change(key, value) {
        this.key = key;
        this.value = value;
    }
    return Change;
}());
exports.Change = Change;
/**
 * @hidden
 */
var ConfigurationService = (function () {
    function ConfigurationService() {
        this.store = {};
        this.source = new BehaviorSubject_1.BehaviorSubject({});
        this.initSource();
    }
    ConfigurationService.prototype.initSource = function () {
        this.onFastChange$ = this.source.asObservable();
        this.onChange$ = this.onFastChange$.auditTime(exports.THROTTLE_MS);
    };
    ConfigurationService.prototype.push = function (store) {
        this.store = store;
        this.source.next(this.store);
    };
    ConfigurationService.prototype.notify = function (change) {
        var store = this.store;
        var parts = change.key.split('.');
        var key = parts.shift();
        while (parts.length > 0) {
            store = store[key] = store[key] || {};
            key = parts.shift();
        }
        store[key] = change.value;
        this.source.next(this.store);
    };
    return ConfigurationService;
}());
ConfigurationService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
ConfigurationService.ctorParameters = function () { return []; };
exports.ConfigurationService = ConfigurationService;
