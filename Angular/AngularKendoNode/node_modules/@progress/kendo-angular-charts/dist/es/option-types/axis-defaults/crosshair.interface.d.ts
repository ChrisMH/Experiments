import { DashType } from '../../common/property-types';
import { AxisDefaultsCrosshairTooltip } from './crosshair.tooltip.interface';
/**
 * The axisDefaults.crosshair options.
 */
export interface AxisDefaultsCrosshair {
    /**
     * The color of the crosshair. Accepts a valid CSS color string, including `hex` and `rgb`.
     */
    color?: string;
    /**
     * The dash type of the crosshair.
     *
     * The following dash types are supported:
     *
     * - `"dash"`&mdash;A line consisting of dashes.
     * - `"dashDot"`&mdash;A line consisting of a repeating pattern of dash-dot.
     * - `"dot"`&mdash;A line consisting of dots.
     * - `"longDash"`&mdash;A line consisting of a repeating pattern of long-dash.
     * - `"longDashDot"`&mdash;A line consisting of a repeating pattern of long-dash-dot.
     * - `"longDashDotDot"`&mdash;A line consisting of a repeating pattern of long-dash-dot-dot.
     * - `"solid"`&mdash;A solid line.
     */
    dashType?: DashType;
    /**
     * The opacity of the crosshair. By default, the crosshair is opaque.
     */
    opacity?: number;
    /**
     * If set to `true`, the Chart displays the axis crosshair.
     * By default, the axis crosshair is not visible.
     */
    visible?: boolean;
    /**
     * The width of the crosshair in pixels.
     */
    width?: number;
    /**
     * The crosshair tooltip options.
     * The crosshair tooltip is displayed when the [`axisDefaults.crosshair.tooltip.visible`]({% slug api_charts_axisdefaultscrosshairtooltip_kendouiforangular %}#toc-visible)
     * option is set to `true`.
     */
    tooltip?: AxisDefaultsCrosshairTooltip;
}
