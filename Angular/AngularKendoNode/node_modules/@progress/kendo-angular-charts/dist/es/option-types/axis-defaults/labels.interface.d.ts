import { drawing } from '@progress/kendo-drawing';
import { AxisLabelVisualArgs, LabelRotation, Margin, Padding } from '../../common/property-types';
/**
 * The axisDefaults.labels options.
 */
export interface AxisDefaultsLabels {
    /**
     * The function which returns the label content.
     *
     * The fields available in the function argument are:
     *
     * - `value`&mdash;The category value.
     * - `dataItem`&mdash;The data item if a field is specified. If the category does not have a
     * corresponding item in the data, an empty object is passed.
     * - `format`&mdash;The default format of the label.
     * - `culture`&mdash;The default culture (if set) on the label.
     *
     * The text can be split into multiple lines by using the line feed characters (`"\n"`).
     */
    content?: (e: any) => string;
    /**
     * The font style of the labels.
     */
    font?: string;
    /**
     * The format used to display the labels. Uses the IntlService [`format`]({% slug api_intl_intlservice_kendouiforangular %}#toc-format) method.
     * Contains one placeholder (`"{0}"`) which represents the category value.
     */
    format?: string;
    /**
     * The margin of the labels. A numeric value sets all margins.
     */
    margin?: Margin | number;
    /**
     * If set to `true`, the Chart mirrors the axis labels and ticks. If the labels are normally on the
     * left side of the axis, the mirroring of the axis renders them to the right.
     */
    mirror?: boolean;
    /**
     * The padding of the labels. A numeric value sets all paddings.
     */
    padding?: Padding | number;
    /**
     * The rotation angle of the labels. By default, the labels are not rotated. Can be set to `"auto"` if the
     * axis is horizontal. In this case, the labels will be rotated only if the slot size is not sufficient
     * for the entire labels.
     */
    rotation?: LabelRotation | number | 'auto';
    /**
     * The number of labels to skip. By default, no labels are skipped.
     */
    skip?: number;
    /**
     * The label rendering step&mdash;renders every n<sup>th</sup> label. By default, every label is rendered.
     */
    step?: number;
    /**
     * If set to `true`, the Chart displays the axis labels. By default, the axis labels are visible.
     */
    visible?: boolean;
    /**
     * A function that can be used to create a custom visual for the labels.
     *
     * The available argument fields are:
     *
     * - `createVisual`&mdash;A function that can be used to get the default visual.
     * - `culture`&mdash;The default culture (if set) of the label.
     * - `dataItem`&mdash;The data item if a field has been specified.
     * - `format`&mdash;The default format of the label.
     * - `options`&mdash;The label options.
     * - `rect`&mdash;The geometry [`Rect`]({% slug api_kendo-drawing_geometry_rect_kendouiforangular %}) that defines where the visual has to be rendered.
     * - `sender`&mdash;The Chart instance (might be `undefined`).
     * - `text`&mdash;The label text.
     * - `value`&mdash;The category value.
     */
    visual?: (e: AxisLabelVisualArgs) => drawing.Element;
}
