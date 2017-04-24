import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/auditTime';
/**
 * @hidden
 */
export var THROTTLE_MS = 1000 / 60;
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
export { Change };
/**
 * @hidden
 */
var ConfigurationService = (function () {
    function ConfigurationService() {
        this.store = {};
        this.source = new BehaviorSubject({});
        this.initSource();
    }
    ConfigurationService.prototype.initSource = function () {
        this.onFastChange$ = this.source.asObservable();
        this.onChange$ = this.onFastChange$.auditTime(THROTTLE_MS);
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
export { ConfigurationService };
ConfigurationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ConfigurationService.ctorParameters = function () { return []; };
