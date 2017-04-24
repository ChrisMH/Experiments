import { geometry } from '@progress/kendo-drawing';
import { AxisRange } from './axis-range.interface';
/**
 * An interface for the Chart axes API.
 */
export interface ChartAxis {
    /**
     * Returns the axis range.
     *
     * @returns {AxisRange} - The axis range.
     */
    range(): AxisRange;
    /**
     * Returns a slot based on the specified from and to values.
     *
     * @param from - The slot start value.
     * @param to - The slot end value.  If not specified, the `from` value is used.
     * @param limit - The parameters for the exported image.
     * @returns {Promise<string>} - Indicates whether the slot is limited to the current range. By default, the range is limited.
     */
    slot(from: string | number | Date, to?: string | number | Date, limit?: boolean): geometry.Rect | geometry.Arc;
    /**
     * Returns the value that corresponds to the passed surface point.
     *
     * @param { Point } point - The chart surface point.
     * @returns {string | number | Date} - The value corresponding to the point.
     */
    value(point: geometry.Point): string | number | Date;
    /**
     * Returns the axis range determined by the minimum and maximum point value associated with the axis.
     *
     * @returns {AxisRange} - The value range.
     */
    valueRange(): AxisRange;
}
