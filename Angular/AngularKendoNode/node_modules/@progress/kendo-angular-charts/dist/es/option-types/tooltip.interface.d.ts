import { Border, Padding } from '../common/property-types';
/**
 * The tooltip options.
 */
export interface Tooltip {
    /**
     * The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.
     */
    background?: string;
    /**
     * The border configuration options.
     */
    border?: Border;
    /**
     * The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The tooltip font.
     */
    font?: string;
    /**
     * The format of the labels. Uses the IntlService [`format`]({% slug api_intl_intlservice_kendouiforangular %}#toc-format) method.
     *
     * Format placeholders:
     *
     * - Area, Bar, Column, Funnel, Line, and Pie
     * {0} - value
     * - Bubble
     * {0} - x value{1} - y value{2} - size value{3} - category name
     * - Scatter and scatterLine
     * {0} - x value{1} - y value
     * - Candlestick and OHLC
     * {0} - open value{1} - high value{2} - low value{3} - close value{4} - category name
     */
    format?: string;
    /**
     * The opacity of the tooltip.
     */
    opacity?: number;
    /**
     * The padding of the tooltip. A numeric value sets all paddings.
     */
    padding?: Padding | number;
    /**
     * If set to `true`, the Chart displays a single tooltip for every category.
     */
    shared?: boolean;
    /**
     * If set to `true`, the Chart displays the series tooltip. By default, the series tooltip is not
     * displayed.
     */
    visible?: boolean;
}
