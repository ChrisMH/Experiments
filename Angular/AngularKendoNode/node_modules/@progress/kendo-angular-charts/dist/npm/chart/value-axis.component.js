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
var value_axis_component_generated_1 = require("./value-axis.component.generated");
/**
 * A collection of one or more value axis configuration components.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * @@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart>
 *       <kendo-chart-value-axis>
 *         <kendo-chart-value-axis-item>
 *         </kendo-chart-value-axis-item>
 *         <kendo-chart-value-axis-item name="secondAxis">
 *         </kendo-chart-value-axis-item>
 *       </kendo-chart-value-axis>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item type="line" [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *         <kendo-chart-series-item type="line" [data]="[0.1, 0.2, 0.3]"
 *                                  axis="secondAxis">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *     </kendo-chart>
 *   `
 * })
 * class AppComponent {
 * }
 *
 * ```
 */
var ValueAxisComponent = (function (_super) {
    __extends(ValueAxisComponent, _super);
    // Place custom properties here
    function ValueAxisComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    return ValueAxisComponent;
}(value_axis_component_generated_1.ValueAxisComponentGenerated));
ValueAxisComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                providers: [collection_service_1.CollectionService],
                selector: 'kendo-chart-value-axis',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisComponent.ctorParameters = function () { return [
    { type: configuration_service_1.ConfigurationService, },
    { type: collection_service_1.CollectionService, },
]; };
exports.ValueAxisComponent = ValueAxisComponent;
