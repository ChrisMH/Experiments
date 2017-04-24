"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var base_tooltip_1 = require("./base-tooltip");
// Codelyzer 2.0.0-beta2 doesn't handle inherited members
/* tslint:disable:no-access-missing-member */
var CROSSHAIR_TOOLTIP_CLASS = 'k-chart-crosshair-tooltip';
/**
 * @hidden
 */
var CrosshairTooltipComponent = (function (_super) {
    __extends(CrosshairTooltipComponent, _super);
    function CrosshairTooltipComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrosshairTooltipComponent.prototype.show = function (e) {
        _super.prototype.show.call(this, e);
        this.popupClasses[CROSSHAIR_TOOLTIP_CLASS] = true;
        this.value = e.value;
    };
    return CrosshairTooltipComponent;
}(base_tooltip_1.BaseTooltip));
CrosshairTooltipComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'kendo-chart-crosshair-tooltip',
                template: "\n    <kendo-popup [offset]=\"offset\" [popupAlign]=\"align\" [animate]=\"false\" *ngIf=\"active\" [collision]=\"collision\" >\n        <div [ngClass]=\"popupClasses\" [ngStyle]=\"style\">\n            {{ value }}\n        </div>\n    </kendo-popup>\n    "
            },] },
];
/** @nocollapse */
CrosshairTooltipComponent.ctorParameters = function () { return []; };
CrosshairTooltipComponent.propDecorators = {
    'key': [{ type: core_1.Input },],
};
exports.CrosshairTooltipComponent = CrosshairTooltipComponent;
