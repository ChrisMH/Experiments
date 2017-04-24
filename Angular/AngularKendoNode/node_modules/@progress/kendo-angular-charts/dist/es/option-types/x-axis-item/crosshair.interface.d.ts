import { XAxisCrosshairTooltip } from './crosshair.tooltip.interface';
/**
 * The xAxis.crosshair options.
 */
export interface XAxisCrosshair {
    /**
     * The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The opacity of the crosshair. By default, the crosshair is opaque.
     */
    opacity?: number;
    /**
     * If set to `true`, the Chart displays the X-axis crosshair of the Scatter Chart.
     * By default, the X-axis crosshair of the Scatter Chart is not visible.
     */
    visible?: boolean;
    /**
     * The width of the crosshair in pixels.
     */
    width?: number;
    /**
     * The crosshair tooltip options.
     *
     * The crosshair tooltip is displayed when the [`xAxis.crosshair.tooltip.visible`]({% slug api_charts_xaxiscrosshairtooltip_kendouiforangular %}#toc-visible) option is set to `true`.
     */
    tooltip?: XAxisCrosshairTooltip;
}
