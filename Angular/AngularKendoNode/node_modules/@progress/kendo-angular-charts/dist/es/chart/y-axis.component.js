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
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConfigurationService } from "../common/configuration.service";
import { CollectionService } from "../common/collection.service";
import { YAxisComponentGenerated } from './y-axis.component.generated';
/**
 * A collection of one or more Y-axis configuration components.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * @@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart>
 *       <kendo-chart-y-axis>
 *         <kendo-chart-y-axis-item>
 *         </kendo-chart-y-axis-item>
 *         <kendo-chart-y-axis-item name="secondAxis">
 *         </kendo-chart-y-axis-item>
 *       </kendo-chart-y-axis>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item type="scatter" [data]="[[1, 2]]">
 *         </kendo-chart-series-item>
 *         <kendo-chart-series-item type="scatter" [data]="[[0.1, 0.2]]"
 *                                  yAxis="secondAxis">
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
var YAxisComponent = (function (_super) {
    __extends(YAxisComponent, _super);
    // Place custom properties here
    function YAxisComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    return YAxisComponent;
}(YAxisComponentGenerated));
export { YAxisComponent };
YAxisComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [CollectionService],
                selector: 'kendo-chart-y-axis',
                template: ''
            },] },
];
/** @nocollapse */
YAxisComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
    { type: CollectionService, },
]; };
