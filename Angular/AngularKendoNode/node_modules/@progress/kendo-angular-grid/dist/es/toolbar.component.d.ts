/**
 * Represents the Kendo UI Grid toolbar component.
 *
 * @example
 * ```ts-preview
 *
 * @@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-grid [data]="gridData">
 *             <kendo-grid-toolbar>
 *                 <button (click)="onClick()" class="k-button">Custom action</button>
 *             </kendo-grid-toolbar>
 *             <kendo-grid-column field="ProductName">
 *             </kendo-grid-column>
 *             <kendo-grid-column field="UnitPrice">
 *             </kendo-grid-column>
 *         </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public gridData = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": true
 *       }
 *     ];
 *
 *     public onClick(): void {
 *         console.log("button was clicked");
 *     }
 * }
 *
 * ```
 */
export declare class ToolbarComponent {
    readonly classNames: string;
}
