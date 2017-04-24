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
import { CategoryAxisLabelsComponent } from '../../../chart/category-axis-item/labels.component';
/**
 * The axis labels configuration.
 */
var NavigatorCategoryAxisLabelsComponent = (function (_super) {
    __extends(NavigatorCategoryAxisLabelsComponent, _super);
    function NavigatorCategoryAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return NavigatorCategoryAxisLabelsComponent;
}(CategoryAxisLabelsComponent));
export { NavigatorCategoryAxisLabelsComponent };
NavigatorCategoryAxisLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-labels',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisLabelsComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
