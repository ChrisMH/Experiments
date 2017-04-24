import { Border, Margin, Padding } from '../../common/property-types';
/**
 * The series.defaultsLabelsTo options.
 */
export interface SeriesDefaultsLabelsTo {
    /**
     * The background color of the to labels. Accepts a valid CSS color string, including hex and rgb.
     */
    background?: string;
    /**
     * The border of the to labels.
     */
    border?: Border;
    /**
     * The text color of the to labels. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The function which returns the Chart series to label content.
     *
     * The fields available in the function argument are:
     *
     * - `category`&mdash;The category name. Available for the Area, Bar, Column, Bubble, Donut, Funnel, Line, and Pie
     * series.
     * - `dataItem`&mdash;The original data item used to construct the point. If binding to an array, it will be `null`.
     * - `percentage`&mdash;The point value represented as a percentage value. Available for the Donut, Funnel, and
     * Pie series.
     * - `series`&mdash;The data series.
     * - `value`&mdash;The point value. Can be a number or object containing each bound field.
     * - `runningTotal`&mdash;The sum of point values since the last `"runningTotal"` summary point. Available for
     * the Waterfall series.
     * - `total`&mdash;The sum of all previous series values. Available for the Waterfall series.
     *
     * The text can be split into multiple lines by using the line feed characters (`"\n"`).
     */
    content?: (e: any) => string;
    /**
     * The font style of the to labels.
     */
    font?: string;
    /**
     * The format of the to labels. Uses the IntlService [`format`]({% slug api_intl_intlservice_kendouiforangular %}#toc-format) method.
     */
    format?: string;
    /**
     * The margin of the to labels. A numeric value sets all margins.
     */
    margin?: Margin | number;
    /**
     * The padding of the to labels. A numeric value sets all paddings.
     */
    padding?: Padding | number;
    /**
     * If set to `true`, the Chart displays the series to labels.
     * By default, the Chart series to labels are not displayed.
     */
    visible?: boolean;
}
