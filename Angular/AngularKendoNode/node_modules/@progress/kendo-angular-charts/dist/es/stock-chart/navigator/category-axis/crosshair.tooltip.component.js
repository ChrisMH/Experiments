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
import { CategoryAxisCrosshairTooltipComponent } from '../../../chart/category-axis-item/crosshair.tooltip.component';
/**
 * The crosshair tooltip options.
 *
 * The crosshair tooltip is displayed when the visible option is set to `true`.
 */
var NavigatorCategoryAxisCrosshairTooltipComponent = (function (_super) {
    __extends(NavigatorCategoryAxisCrosshairTooltipComponent, _super);
    function NavigatorCategoryAxisCrosshairTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return NavigatorCategoryAxisCrosshairTooltipComponent;
}(CategoryAxisCrosshairTooltipComponent));
export { NavigatorCategoryAxisCrosshairTooltipComponent };
NavigatorCategoryAxisCrosshairTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-crosshair-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisCrosshairTooltipComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
