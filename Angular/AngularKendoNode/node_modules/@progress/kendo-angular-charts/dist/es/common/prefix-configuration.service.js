var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable, Inject, OpaqueToken } from '@angular/core';
import { ConfigurationService, Change } from './configuration.service';
import { RootConfigurationService } from './root-configuration.service';
/**
 * @hidden
 */
export var PREFIX = new OpaqueToken('configuration prefix');
/**
 * @hidden
 */
var PrefixConfigurationService = (function (_super) {
    __extends(PrefixConfigurationService, _super);
    function PrefixConfigurationService(rootService, prefix) {
        var _this = _super.call(this) || this;
        _this.rootService = rootService;
        _this.prefix = prefix;
        return _this;
    }
    PrefixConfigurationService.prototype.push = function (store) {
        this.rootService.notify(new Change(this.prefix, store));
    };
    PrefixConfigurationService.prototype.notify = function (change) {
        change.key = this.prefix + (change.key ? "." + change.key : '');
        this.rootService.notify(change);
    };
    return PrefixConfigurationService;
}(ConfigurationService));
export { PrefixConfigurationService };
PrefixConfigurationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PrefixConfigurationService.ctorParameters = function () { return [
    { type: RootConfigurationService, decorators: [{ type: Inject, args: [RootConfigurationService,] },] },
    { type: undefined, decorators: [{ type: Inject, args: [PREFIX,] },] },
]; };
