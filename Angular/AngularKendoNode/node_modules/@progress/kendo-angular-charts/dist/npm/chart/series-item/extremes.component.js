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
var extremes_component_generated_1 = require("../series-item/extremes.component.generated");
/**
 * The Chart series extremes configuration. Applies to extreme outliers.
 * For more information, refer to [`series.outliers`]({% slug api_charts_seriesitemcomponent_kendouiforangular %}#toc-outliers).
 */
var SeriesExtremesComponent = (function (_super) {
    __extends(SeriesExtremesComponent, _super);
    // Place custom properties here
    function SeriesExtremesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return SeriesExtremesComponent;
}(extremes_component_generated_1.SeriesExtremesComponentGenerated));
SeriesExtremesComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-extremes',
                template: ''
            },] },
];
/** @nocollapse */
SeriesExtremesComponent.ctorParameters = function () { return [
    { type: configuration_service_1.ConfigurationService, },
]; };
exports.SeriesExtremesComponent = SeriesExtremesComponent;
