import { LineStyle } from './line-style';
/**
 * Appearance settings for the line of the Area, Candlestick, OHLC, and Waterfall series.
 */
export interface SeriesLine {
    /**
     * The color of the line. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The line opacity. By default, the line is opaque (`opacity = 1`).
     */
    opacity?: number;
    /**
     * The line drawing style.
     *
     * The supported values are:
     *
     * * `"normal"`&mdash;The values will be connected with a straight line.
     * * `"step"`&mdash;The values will be connected with a right-angled line.
     * * `"smooth"`&mdash;The values will be connected with a smooth line.
     *
     * The default value is `"normal"`.
     *
     * The `style` option is supported for the Area, Polar Area, and Radar Area series.
     * The `step` value is supported only for the Area series.
     */
    style?: LineStyle;
    /**
     * The line width in pixels.
     *
     * By default, the width is set to `0` and the line is not visible.
     */
    width?: number;
}
