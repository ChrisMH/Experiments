import { AxisLine, AxisTicks, BaseUnit, GridLines, PlotBand } from '../common/property-types';
import { XAxisCrosshair } from './x-axis-item/crosshair.interface';
import { XAxisLabels } from './x-axis-item/labels.interface';
import { XAxisNotes } from './x-axis-item/notes.interface';
import { XAxisTitle } from './x-axis-item/title.interface';
/**
 * The xAxis options.
 */
export interface XAxis {
    /**
     * (Only for objects) The value at which the Y axis crosses this axis.
     *
     * (Only for arrays) The value indices at which the y axes cross the value axis.
     *
     * (Only for dates) The date at which the Y axis crosses this axis.
     *
     * To denote the far end of the axis, set a value greater than or equal to the axis maximum value.
     */
    axisCrossingValue?: any | any[];
    /**
     * The background color of the axis.
     */
    background?: string;
    /**
     * The base time interval for the axis labels. The default `baseUnit` is automatically determined from
     * the value range.
     *
     * The available options are:
     *
     * - milliseconds
     * - seconds
     * - minutes
     * - hours
     * - days
     * - weeks
     * - months
     * - years
     */
    baseUnit?: BaseUnit;
    /**
     * The color of the axis. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.
     */
    line?: AxisLine;
    /**
     * The configuration of the major grid lines. These are the lines that are an extension of the major
     * ticks through the body of the Chart.
     */
    majorGridLines?: GridLines;
    /**
     * The configuration of the Scatter Chart X-axis major ticks.
     */
    majorTicks?: AxisTicks;
    /**
     * The interval between major divisions.
     * If this is a date axis, the value represents the number of [`xAxis.baseUnits`]({% slug api_charts_xaxis_kendouiforangular %}#toc-baseunit) between major divisions.
     * If [`xAxis.type`]({% slug api_charts_xaxis_kendouiforangular %}#toc-type) is set to `"log"`, the `majorUnit` value is used for the base of the logarithm.
     */
    majorUnit?: number;
    /**
     * The maximum value of the axis.
     */
    max?: any;
    /**
     * The minimum value of the axis.
     */
    min?: any;
    /**
     * The configuration of the minor grid lines. These are the lines that are an extension of the minor
     * ticks through the body of the Chart.
     */
    minorGridLines?: GridLines;
    /**
     * The configuration of the X-axis minor ticks.
     */
    minorTicks?: AxisTicks;
    /**
     * The interval between minor divisions. It defaults to 1/5 of the [`xAxis.majorUnit`]({% slug api_charts_xaxis_kendouiforangular %}#toc-majorunit).
     * If [`xAxis.type`]({% slug api_charts_xaxis_kendouiforangular %}#toc-type) is set to `"log"`, the `minorUnit` value represents the number of divisions between
     * 2 major units and defaults to the major unit minus 1.
     */
    minorUnit?: number;
    /**
     * The unique axis name. Used to associate a series with a X axis by using the [`series.xAxis`]({% slug api_charts_series_kendouiforangular %}#toc-xaxis) option.
     */
    name?: string;
    /**
     * If set to `true`, the Chart prevents the automatic axis range from snapping to 0.
     * Setting it to `false` forces the automatic axis range to snap to 0.
     */
    narrowRange?: boolean;
    /**
     * The name of the pane that the axis has to be rendered in.
     * If not set, the axis is rendered in the first (default) pane.
     */
    pane?: string;
    /**
     * The plot bands of the X axis.
     */
    plotBands?: PlotBand[];
    /**
     * If set to `true`, the value axis direction is reversed.
     * By default, values increase from left to right and from bottom to top.
     */
    reverse?: boolean;
    /**
     * The angle (in degrees) where the 0 value is placed.
     *
     * Angles increase counterclockwise and 0 (zero) is to the right. Negative values are acceptable.
     */
    startAngle?: number;
    /**
     * The axis type.
     *
     * The supported values are:
     *
     * - `"numeric"`&mdash;Numeric axis.
     * - `"date"`&mdash;Specialized axis for displaying chronological data.
     * - `"log"`&mdash;Logarithmic axis.
     *
     * The Chart automatically switches to a date axis if the series X value
     * is of the `Date` type. To avoid this behavior, set the `type`.
     */
    type?: 'numeric' | 'log' | 'date';
    /**
     * If set to `true`, the Chart displays the X axis. By default, the X axis is visible.
     */
    visible?: boolean;
    /**
     * The crosshair configuration options.
     *
     * The crosshair is displayed when the [`xAxis.crosshair.visible`]({% slug api_charts_xaxiscrosshair_kendouiforangular %}#toc-visible) option is set to `true`.
     */
    crosshair?: XAxisCrosshair;
    /**
     * The axis labels configuration.
     */
    labels?: XAxisLabels;
    /**
     * The X-axis notes configuration.
     */
    notes?: XAxisNotes;
    /**
     * The title configuration of the Scatter Chart X axis.
     *
     * To display the title, set the [`xAxis.title.text`]({% slug api_charts_xaxistitle_kendouiforangular %}#toc-text) option.
     */
    title?: XAxisTitle;
}
