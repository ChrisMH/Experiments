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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';
import { AxisDefaultsComponentGenerated } from './axis-defaults.component.generated';
/**
 * The default options for all Chart axes. Accepts the options supported by [`categoryAxis`]({% slug api_charts_categoryaxisitemcomponent_kendouiforangular %}), [`valueAxis`]({% slug api_charts_valueaxisitemcomponent_kendouiforangular %}), [`xAxis`]({% slug api_charts_xaxisitemcomponent_kendouiforangular %}), and [`yAxis`]({% slug api_charts_yaxisitemcomponent_kendouiforangular %}).
 */
var AxisDefaultsComponent = (function (_super) {
    __extends(AxisDefaultsComponent, _super);
    // Place custom properties here
    function AxisDefaultsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return AxisDefaultsComponent;
}(AxisDefaultsComponentGenerated));
export { AxisDefaultsComponent };
AxisDefaultsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-axis-defaults',
                template: ''
            },] },
];
/** @nocollapse */
AxisDefaultsComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
