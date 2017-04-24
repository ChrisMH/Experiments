/**
 * Appearance configuration for the axis major and minor ticks.
 */
export interface AxisTicks {
    /**
     * The color of the tick lines. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The length of the tick line in pixels.
     */
    size?: number;
    /**
     * The tick-rendering step. Every n<sup>th</sup> tick, where `n` is the step, is rendered.
     */
    skip?: number;
    /**
     * The number of ticks to skip at the beginning.
     */
    step?: number;
    /**
     * If set to `true,` the Chart displays the axis ticks.
     * By default, only the axis major ticks are visible.
     */
    visible?: boolean;
    /**
     * The width of the ticks in pixels.
     */
    width?: number;
}
