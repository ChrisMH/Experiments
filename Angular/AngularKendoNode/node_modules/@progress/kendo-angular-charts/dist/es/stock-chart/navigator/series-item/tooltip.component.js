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
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesTooltipComponent } from '../../../chart/series-item/tooltip.component';
/**
 * The configuration options of the StockChart navigator series tooltip.
 * The StockChart navigator series tooltip is displayed when the `navigator.series.tooltip.visible` option is set to `true`.
 */
var NavigatorSeriesTooltipComponent = (function (_super) {
    __extends(NavigatorSeriesTooltipComponent, _super);
    function NavigatorSeriesTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return NavigatorSeriesTooltipComponent;
}(SeriesTooltipComponent));
export { NavigatorSeriesTooltipComponent };
NavigatorSeriesTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesTooltipComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
