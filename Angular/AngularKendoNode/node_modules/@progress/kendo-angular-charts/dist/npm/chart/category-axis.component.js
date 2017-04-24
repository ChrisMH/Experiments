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
var configuration_service_1 = require("../common/configuration.service");
var collection_service_1 = require("../common/collection.service");
var category_axis_component_generated_1 = require("./category-axis.component.generated");
/**
 * A collection of one or more category axis items.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * @@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart>
 *       <kendo-chart-category-axis>
 *         <kendo-chart-category-axis-item [categories]="[2015, 2016]" color="#f00">
 *         </kendo-chart-category-axis-item>
 *       </kendo-chart-category-axis>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item type="line" [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *     </kendo-chart>
 *   `
 * })
 * class AppComponent {
 * }
 * ```
 */
var CategoryAxisComponent = (function (_super) {
    __extends(CategoryAxisComponent, _super);
    // Place custom properties here
    function CategoryAxisComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    return CategoryAxisComponent;
}(category_axis_component_generated_1.CategoryAxisComponentGenerated));
CategoryAxisComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                providers: [collection_service_1.CollectionService],
                selector: 'kendo-chart-category-axis',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisComponent.ctorParameters = function () { return [
    { type: configuration_service_1.ConfigurationService, },
    { type: collection_service_1.CollectionService, },
]; };
exports.CategoryAxisComponent = CategoryAxisComponent;
