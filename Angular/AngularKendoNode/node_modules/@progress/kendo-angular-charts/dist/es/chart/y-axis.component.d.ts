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
export declare class YAxisComponent extends YAxisComponentGenerated {
    protected configurationService: ConfigurationService;
    protected collectionService: CollectionService;
    constructor(configurationService: ConfigurationService, collectionService: CollectionService);
}
