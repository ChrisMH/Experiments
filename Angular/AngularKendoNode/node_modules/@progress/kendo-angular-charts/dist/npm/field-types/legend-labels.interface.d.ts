import { LegendLabelsContentArgs } from '../argument-types/legend-labels-content-args.interface';
import { Margin } from './margin.interface';
import { Padding } from './padding.interface';
/**
 * Appearance configuration for the legend labels.
 */
export interface LegendLabels {
    /**
     * The color of the legend label text.
     * Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The color of the legend label text.
     * Accepts a valid CSS color string, including hex and rgb.
     */
    font?: string;
    /**
     * The margin of the labels. A numeric value sets all margins.
     */
    margin?: Margin | number;
    /**
     * The padding of the labels. A numeric value sets all paddings.
     */
    padding?: Padding | number;
    /**
     * A function used to generate the content of each label.
     */
    content?: (e: LegendLabelsContentArgs) => string;
}
