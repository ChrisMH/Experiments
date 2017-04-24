import { Border, Margin, Padding } from '../common/property-types';
import { PanesTitle } from './pane/title.interface';
/**
 * The pane options.
 */
export interface Pane {
    /**
     * The background color of the Chart pane. Accepts a valid CSS color string, including hex and rgb.
     */
    background?: string;
    /**
     * The border of the Chart pane.
     */
    border?: Border;
    /**
     * Specifies whether the Charts in the pane have to be clipped. By default, all Charts except the Radar
     * and Polar Charts are clipped.
     */
    clip?: boolean;
    /**
     * The Chart pane height in pixels.
     */
    height?: number;
    /**
     * The margin of the pane. A numeric value sets all margins.
     */
    margin?: Margin | number;
    /**
     * The unique name of the Chart pane.
     */
    name?: string;
    /**
     * The padding of the pane. A numeric value sets all paddings.
     */
    padding?: Padding | number;
    /**
     * The title configuration of the Chart pane.
     *
     * To display the title, set the [`panes.title.text`]({% slug api_charts_panestitle_kendouiforangular %}#toc-text) option.
     */
    title?: string | PanesTitle;
}
