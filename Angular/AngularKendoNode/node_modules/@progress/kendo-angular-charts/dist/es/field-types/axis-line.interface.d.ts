import { DashType } from './dash-type';
/**
 * Appearance settings for the axis lines.
 * Also affects the major and minor ticks, but not the grid lines.
 */
export interface AxisLine {
    /**
     * The color of the lines. Accepts a valid CSS color string, including hex and rgb.
     *
     * Setting the `color` option affects the major and minor ticks, but not the grid lines.
     */
    color?: string;
    /**
     * The dash type of the line.
     */
    dashType?: DashType;
    /**
     * If set to `true`, the Chart displays the axis lines.
     * By default, the axis lines are visible.
     */
    visible?: boolean;
    /**
     * The width of the line in pixels.
     * Also affects the major and minor ticks, but not the grid lines.
     */
    width?: number;
}
