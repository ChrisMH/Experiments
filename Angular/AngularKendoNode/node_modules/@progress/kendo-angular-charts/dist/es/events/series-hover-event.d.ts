import { ChartComponent } from '../chart.component';
import { BaseEvent } from './base-event';
import { EventSeriesOptions } from '../api-types/event-series-options.interface';
import { SeriesPoint } from '../api-types/series-point.interface';
/**
 * Arguments for the `seriesHover` event.
 */
export declare class SeriesHoverEvent extends BaseEvent {
    /**
     * The data point category.
     */
    category: any;
    /**
     * A list of all points that are in the same category. Each item has the same fields&mdash;`value`, `series`, `dataItem`, and other.
     */
    categoryPoints: any[];
    /**
     * The original data item.
     */
    dataItem: any;
    /**
     * The original user event that triggered the drag action.
     */
    originalEvent: any;
    /**
     * The point value represented as a percentage value. Available only for the Donut, Pie, and 100% stacked charts.
     */
    percentage: number;
    /**
     * The hovered series point.
     */
    point: SeriesPoint;
    /**
     * The hovered point series options.
     */
    series: EventSeriesOptions;
    /**
     * The cumulative point value on the stack. Available only for the stackable series.
     */
    stackValue: number;
    /**
     * The data point value.
     */
    value: any;
    /**
     * @hidden
     */
    constructor(e: any, sender: ChartComponent);
}
