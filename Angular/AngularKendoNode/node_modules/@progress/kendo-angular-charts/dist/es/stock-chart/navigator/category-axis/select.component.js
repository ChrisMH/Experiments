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
import { CategoryAxisSelectComponent } from '../../../chart/category-axis-item/select.component';
/**
 * The selected axis range. If set, the axis selection is enabled. The range is index-based and starts from 0.
 * Categories with indexes in the range (`select.from`, `select.to`) will be selected.
 * That is, the last category in the range will not be included in the selection.
 * If the categories are dates, the range also has to be specified with date values.
 */
var NavigatorCategoryAxisSelectComponent = (function (_super) {
    __extends(NavigatorCategoryAxisSelectComponent, _super);
    function NavigatorCategoryAxisSelectComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return NavigatorCategoryAxisSelectComponent;
}(CategoryAxisSelectComponent));
export { NavigatorCategoryAxisSelectComponent };
NavigatorCategoryAxisSelectComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-select',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisSelectComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
