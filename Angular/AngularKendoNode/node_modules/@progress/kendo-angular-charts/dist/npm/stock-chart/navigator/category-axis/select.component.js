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
var configuration_service_1 = require("../../../common/configuration.service");
var select_component_1 = require("../../../chart/category-axis-item/select.component");
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
}(select_component_1.CategoryAxisSelectComponent));
NavigatorCategoryAxisSelectComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-select',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisSelectComponent.ctorParameters = function () { return [
    { type: configuration_service_1.ConfigurationService, },
]; };
exports.NavigatorCategoryAxisSelectComponent = NavigatorCategoryAxisSelectComponent;
