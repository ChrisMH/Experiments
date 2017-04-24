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
import { Component, ChangeDetectionStrategy, ContentChildren } from '@angular/core';
import { ConfigurationService } from "../../common/configuration.service";
import { CollectionService } from "../../common/collection.service";
import { TooltipTemplateService } from "../../common/tooltip-template.service";
import { SeriesComponent } from '../../chart/series.component';
import { NavigatorSeriesItemComponent } from './series-item.component';
/**
 * A collection of one or more navigator series items.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * @@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-stockchart>
 *         <kendo-chart-navigator>
 *             <kendo-chart-navigator-series>
 *                 <kendo-chart-navigator-series-item type="area" [data]="data" field="value" categoryField="date">
 *                 </kendo-chart-navigator-series-item>
 *             </kendo-chart-navigator-series>
 *         </kendo-chart-navigator>
 *     </kendo-stockchart>
 *   `
 * })
 * class AppComponent {
 *   public data: any[] = [];
 *
 *   constructor() {
 *      for (let idx = 0; idx < 100; idx++) {
 *          this.data.push({
 *              date: new Date(2017, 0, idx),
 *              value: Math.random() * 100
 *          });
 *      }
 *   }
 * }
 *
 * ```
 */
var NavigatorSeriesComponent = (function (_super) {
    __extends(NavigatorSeriesComponent, _super);
    function NavigatorSeriesComponent(configurationService, collectionService, tooltipTemplateService) {
        var _this = _super.call(this, configurationService, collectionService, tooltipTemplateService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        _this.tooltipTemplateService = tooltipTemplateService;
        return _this;
    }
    return NavigatorSeriesComponent;
}(SeriesComponent));
export { NavigatorSeriesComponent };
NavigatorSeriesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [CollectionService],
                selector: 'kendo-chart-navigator-series',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
    { type: CollectionService, },
    { type: TooltipTemplateService, },
]; };
NavigatorSeriesComponent.propDecorators = {
    'children': [{ type: ContentChildren, args: [NavigatorSeriesItemComponent,] },],
};
