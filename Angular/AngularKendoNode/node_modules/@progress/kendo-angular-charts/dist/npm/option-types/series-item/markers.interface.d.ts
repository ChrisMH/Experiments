import { drawing } from '@progress/kendo-drawing';
import { Border, MarkersVisualArgs, MarkerType } from '../../common/property-types';
/**
 * The series.markers options.
 */
export interface SeriesMarkers {
    /**
     * The background color of the series markers.
     */
    background?: string;
    /**
     * The border of the markers.
     */
    border?: Border;
    /**
     * The rotation angle of the markers.
     */
    rotation?: number;
    /**
     * The marker size in pixels.
     */
    size?: number;
    /**
     * The markers shape.
     *
     * The supported values are:
     * * `"circle"`&mdash;The marker shape is a circle.
     * * `"square"`&mdash;The marker shape is a square.
     * * `"triangle"`&mdash;The marker shape is a triangle.
     * * `"cross"`&mdash;The marker shape is a cross.
     */
    type?: MarkerType;
    /**
     * If set to `true`, the Chart displays the series markers.
     * By default, the Chart series markers are displayed.
     */
    visible?: boolean;
    /**
     * A function that can be used to create a custom visual for the markers.
     *
     * The available argument fields are:
     *
     * - `rect`&mdash;The [geometry Rect]({% slug api_kendo-drawing_geometry_rect_kendouiforangular %}) that defines where the visual has to be rendered.
     * - `options`&mdash;The marker options.
     * - `createVisual`&mdash;A function that can be used to get the default visual.
     * - `category`&mdash;The category of the marker point.
     * - `dataItem`&mdash;The `dataItem` of the marker point.
     * - `value`&mdash;The value of the marker point.
     * - `sender`&mdash;The Chart instance.
     * - `series`&mdash;The series of the marker point.
     */
    visual?: (e: MarkersVisualArgs) => drawing.Element;
}
