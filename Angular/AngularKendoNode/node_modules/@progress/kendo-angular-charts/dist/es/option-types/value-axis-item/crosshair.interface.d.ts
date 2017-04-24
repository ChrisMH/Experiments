import { ValueAxisCrosshairTooltip } from './crosshair.tooltip.interface';
/**
 * The valueAxis.crosshair options.
 */
export interface ValueAxisCrosshair {
    /**
     * The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The opacity of the crosshair. By default, the crosshair is opaque.
     */
    opacity?: number;
    /**
     * If set to `true`, the Chart displays the value axis crosshair.
     * By default, the value axis crosshair is not visible.
     */
    visible?: boolean;
    /**
     * The width of the crosshair in pixels.
     */
    width?: number;
    /**
     * The crosshair tooltip options.
     *
     * The crosshair tooltip is displayed when the [`valueAxis.crosshair.tooltip.visible`]({% slug api_charts_valueaxiscrosshairtooltip_kendouiforangular %}#toc-visible) option is set to
     * `true`.
     */
    tooltip?: ValueAxisCrosshairTooltip;
}
