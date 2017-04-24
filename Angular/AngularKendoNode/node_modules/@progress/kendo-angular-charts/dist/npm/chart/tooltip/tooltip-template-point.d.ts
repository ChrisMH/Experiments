import { TemplateRef } from '@angular/core';
/**
 * The point passed to the tooltip template.
 */
export declare class TooltipTemplatePoint {
    /**
     * The point value.
     */
    value: any;
    /**
     * The point category. Available only for the Categorical series.
     */
    category: string | Date | number;
    /**
     * The point series options.
     */
    series: any;
    /**
     * The point `dataItem`.
     */
    dataItem: any;
    /**
     * The point value represented as a percentage value. Available only for the Donut, Pie, and 100% Stacked charts.
     */
    percentage: number;
    /**
     * The sum of point values since the last `"runningTotal"` summary point. Available for the Waterfall series.
     */
    runningTotal: number;
    /**
     * The sum of all previous series values. Available for the Waterfall series.
     */
    total: number;
    /**
     * The point error bar low value. Available for the Categorical series with error bars.
     */
    low: number;
    /**
     * The point error bar high value. Available for the Categorical series with error bars.
     */
    high: number;
    /**
     * The point error bar x low value. Available for the Scatter series with error bars.
     */
    xLow: number;
    /**
     * The point error bar x high value. Available for the Scatter series with error bars.
     */
    xHigh: number;
    /**
     * The point error bar y low value. Available for the Scatter series with error bars.
     */
    yLow: number;
    /**
     * The point error bar y low value. Available for the Scatter series with error bars.
     */
    yHigh: number;
    private point;
    private format;
    private template;
    /**
     * @hidden
     */
    constructor(point: any, format?: string, template?: TemplateRef<any>);
    private readonly formattedValue;
}
