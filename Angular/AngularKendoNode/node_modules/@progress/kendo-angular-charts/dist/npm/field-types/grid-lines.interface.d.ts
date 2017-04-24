import { DashType } from './dash-type';
/**
 * Appearance configuration for the axis major and minor grid lines.
 */
export interface GridLines {
    /**
     * The color of the grid lines. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The dash type of the grid lines.
     */
    dashType?: DashType;
    /**
     * The tick-rendering step. Every n<sup>th</sup> line, where `n` is the step, is rendered.
     */
    skip?: number;
    /**
     * The number of lines to skip at the beginning.
     */
    step?: number;
    /**
     * If set to `true`, the Chart displays the lines.
     * By default, only the axis major grid lines are visible.
     */
    visible?: boolean;
    /**
     * The width of the lines in pixels.
     */
    width?: number;
}
