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
import { ChartAreaComponentGenerated } from './chart-area.component.generated';
/**
 * The Chart area configuration options. Represents the entire visible area of the Chart.
 */
var ChartAreaComponent = (function (_super) {
    __extends(ChartAreaComponent, _super);
    // Place custom properties here
    function ChartAreaComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return ChartAreaComponent;
}(ChartAreaComponentGenerated));
export { ChartAreaComponent };
ChartAreaComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-area',
                template: ''
            },] },
];
/** @nocollapse */
ChartAreaComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
