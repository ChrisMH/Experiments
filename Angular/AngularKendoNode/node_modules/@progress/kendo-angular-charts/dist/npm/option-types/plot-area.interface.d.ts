import { Border, Margin, Padding } from '../common/property-types';
/**
 * The plotArea options.
 */
export interface PlotArea {
    /**
     * The background color of the Chart plot area. Accepts a valid CSS color string, including hex and
     * rgb.
     */
    background?: string;
    /**
     * The border of the Chart plot area.
     */
    border?: Border;
    /**
     * The margin of the Chart plot area. A numeric value sets all margins.
     */
    margin?: Margin | number;
    /**
     * The background opacity of the Chart plot area. By default, the background is opaque.
     */
    opacity?: number;
    /**
     * The padding of the Chart plot area. A numeric value sets all paddings.
     *
     * The default padding for the Pie, Donut, Radar, and Polar Charts is proportional of the Chart size.
     */
    padding?: Padding | number;
}
