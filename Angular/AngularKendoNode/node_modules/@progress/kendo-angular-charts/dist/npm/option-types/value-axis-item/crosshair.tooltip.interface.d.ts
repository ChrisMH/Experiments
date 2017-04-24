import { Border, Padding } from '../../common/property-types';
/**
 * The valueAxis.crosshair.tooltip options.
 */
export interface ValueAxisCrosshairTooltip {
    /**
     * The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.
     */
    background?: string;
    /**
     * The border options.
     */
    border?: Border;
    /**
     * The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The tooltip font.
     */
    font?: string;
    /**
     * The format used to display the tooltip. Uses the IntlService [`format`]({% slug api_intl_intlservice_kendouiforangular %}#toc-format) method.
     * Contains one placeholder (`"{0}"`) which represents the value.
     */
    format?: string;
    /**
     * The padding of the crosshair tooltip. A numeric value sets all paddings.
     */
    padding?: Padding | number;
    /**
     * If set to `true`, the chart displays the value axis crosshair tooltip.
     * By default, the value axis crosshair tooltip is not visible.
     */
    visible?: boolean;
}
