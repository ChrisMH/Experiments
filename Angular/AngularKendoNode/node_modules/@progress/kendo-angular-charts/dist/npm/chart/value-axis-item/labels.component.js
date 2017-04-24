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
var configuration_service_1 = require("../../common/configuration.service");
var labels_component_generated_1 = require("../value-axis-item/labels.component.generated");
/**
 * The axis labels configuration.
 */
var ValueAxisLabelsComponent = (function (_super) {
    __extends(ValueAxisLabelsComponent, _super);
    // Place custom properties here
    function ValueAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return ValueAxisLabelsComponent;
}(labels_component_generated_1.ValueAxisLabelsComponentGenerated));
ValueAxisLabelsComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-labels',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisLabelsComponent.ctorParameters = function () { return [
    { type: configuration_service_1.ConfigurationService, },
]; };
exports.ValueAxisLabelsComponent = ValueAxisLabelsComponent;
