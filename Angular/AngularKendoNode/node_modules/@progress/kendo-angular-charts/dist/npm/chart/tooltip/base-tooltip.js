"use strict";
/* tslint:disable:align */
Object.defineProperty(exports, "__esModule", { value: true });
var TOOLTIP_CLASS = "k-chart-tooltip";
/**
 * @hidden
 */
var BaseTooltip = (function () {
    function BaseTooltip() {
        this.active = false;
        this.offset = {};
        this.align = {};
        this.style = {};
        this.popupClasses = {};
        this.collision = { horizontal: "fit", vertical: "fit" };
    }
    BaseTooltip.prototype.show = function (e) {
        this.active = true;
        this.align = e.anchor.align;
        this.offset = e.anchor.point;
        this.popupClasses = Object.assign((_a = {},
            _a[TOOLTIP_CLASS] = true,
            _a[e.className] = !!e.className,
            _a), this.classNames);
        this.style = e.style;
        var _a;
    };
    BaseTooltip.prototype.hide = function () {
        this.active = false;
    };
    return BaseTooltip;
}());
exports.BaseTooltip = BaseTooltip;
