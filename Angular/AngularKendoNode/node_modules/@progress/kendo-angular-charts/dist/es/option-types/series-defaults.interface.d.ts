import { drawing } from '@progress/kendo-drawing';
import { Border, Overlay, SeriesStack, SeriesType, SeriesVisualArgs } from '../common/property-types';
import { SeriesDefaultsLabels } from './series-defaults/labels.interface';
import { SeriesDefaultsNotes } from './series-defaults/notes.interface';
import { SeriesDefaultsTooltip } from './series-defaults/tooltip.interface';
/**
 * The series.defaults options.
 */
export interface SeriesDefaults {
    /**
     * The border of the series.
     */
    border?: Border;
    /**
     * The distance between category clusters.
     */
    gap?: number;
    /**
     * The Chart series overlay options.
     */
    overlay?: Overlay;
    /**
     * The space between the Chart series as proportion of the series width.
     *
     * The spacing option is supported when [`series.type`]({% slug api_charts_series_kendouiforangular %}#toc-type) is set to `"bar"`, `"column"`, `"candlestick"`, `"ohlc"`,
     * and `"waterfall"`.
     */
    spacing?: number;
    /**
     * A Boolean value indicating if the series has to be stacked.
     *
     * The stack option is supported when [`series.type`]({% slug api_charts_series_kendouiforangular %}#toc-type) is set to `"bar"`, `"column"`, `"line"`, `"area"`,
     * `"verticalLine"`, `"verticalArea"`, `"radarLine"`, `"radarArea"`, and `"radarColumn"`.
     */
    stack?: boolean | string | SeriesStack;
    /**
     * The default type of the series.
     *
     * The supported values are:
     *
     * - `area`
     * - `bar`
     * - `bubble`
     * - `bullet`
     * - `candlestick`
     * - `column`
     * - `donut`
     * - `funnel`
     * - `line`
     * - `ohlc`
     * - `pie`
     * - `polarArea`
     * - `polarLine`
     * - `polarScatter`
     * - `radarArea`
     * - `radarColumn`
     * - `radarLine`
     * - `scatter`
     * - `scatterLine`
     * - `waterfall`
     * - `verticalArea`
     * - `verticalBullet`
     * - `verticalLine`
     */
    type?: SeriesType;
    /**
     * A function that can be used to create a custom visual for the points. Applicable for the Bar and Column
     * series.
     *
     * The available argument fields are:
     *
     * - `rect`&mdash;The geometry [`Rect`]({% slug api_kendo-drawing_geometry_rect_kendouiforangular %}) that defines where the visual has to be rendered.
     * - `options`&mdash;The point options.
     * - `createVisual`&mdash;A function that can be used to get the default visual.
     * - `category`&mdash;The point category.
     * - `dataItem`&mdash;The point `dataItem`.
     * - `value`&mdash;The point value.
     * - `sender`&mdash;The Chart instance.
     * - `series`&mdash;The point series.
     */
    visual?: (e: SeriesVisualArgs) => drawing.Element;
    /**
     * The Chart series label configuration.
     *
     * The Chart displays the series labels when the [`seriesDefaults.labels.visible`]({% slug api_charts_seriesdefaultslabels_kendouiforangular %}#toc-visible) option is set to `true`.
     */
    labels?: SeriesDefaultsLabels;
    /**
     * The `seriesDefaults` notes configuration.
     */
    notes?: SeriesDefaultsNotes;
    /**
     * The configuration options of the chart series tooltip.
     *
     * The Chart series tooltip is displayed when the [`seriesDefaults.tooltip.visible`]({% slug api_charts_seriesdefaultstooltip_kendouiforangular %}#toc-visible) option is set to `true`.
     */
    tooltip?: SeriesDefaultsTooltip;
}
