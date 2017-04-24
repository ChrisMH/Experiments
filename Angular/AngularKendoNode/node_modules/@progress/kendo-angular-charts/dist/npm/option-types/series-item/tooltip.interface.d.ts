import { Border, Padding } from '../../common/property-types';
/**
 * The series.tooltip options.
 */
export interface SeriesTooltip {
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
     * The format of the labels. Uses [IntlService format]({% slug api_intl_intlservice_kendouiforangular %}#toc-format).
     *
     * Format placeholders:
     *
     * - Area, Bar, Column, Line, Pie, radarArea, radarColumn and radarLine
     * {0} - value
     * - Bubble
     * {0} - x value{1} - y value{2} - size value{3} - category name
     * - Scatter, scatterLine
     * {0} - x value{1} - y value
     * - PolarArea, polarLine and polarScatter
     * {0} - x value (degrees){1} - y value
     * - Candlestick and OHLC
     * {0} - open value{1} - high value{2} - low value{3} - close value{4} - category name
     */
    format?: string;
    /**
     * The padding of the tooltip. A numeric value sets all paddings.
     */
    padding?: Padding | number;
    /**
     * If set to `true`, the Chart displays the series tooltip.
     * By default, the series tooltip is not displayed.
     */
    visible?: boolean;
}
