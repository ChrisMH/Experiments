import { ConfigurationService } from "../common/configuration.service";
import { CollectionService } from "../common/collection.service";
import { XAxisComponentGenerated } from './x-axis.component.generated';
/**
 * A collection of one or more X-axis configuration components.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * @@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart>
 *       <kendo-chart-x-axis>
 *         <kendo-chart-x-axis-item>
 *         </kendo-chart-x-axis-item>
 *         <kendo-chart-x-axis-item name="secondAxis">
 *         </kendo-chart-x-axis-item>
 *       </kendo-chart-x-axis>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item type="scatter" [data]="[[1, 2]]">
 *         </kendo-chart-series-item>
 *         <kendo-chart-series-item type="scatter" [data]="[[0.1, 0.2]]"
 *                                  xAxis="secondAxis">
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
export declare class XAxisComponent extends XAxisComponentGenerated {
    protected configurationService: ConfigurationService;
    protected collectionService: CollectionService;
    constructor(configurationService: ConfigurationService, collectionService: CollectionService);
}
