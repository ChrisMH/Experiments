import { Border, MarkerType } from '../../common/property-types';
/**
 * The series.extremes options.
 */
export interface SeriesExtremes {
    /**
     * The background color of the series outliers.
     */
    background?: string;
    /**
     * The border of the extremes.
     */
    border?: Border;
    /**
     * The rotation angle of the extremes.
     */
    rotation?: number;
    /**
     * The extremes size in pixels.
     */
    size?: number;
    /**
     * The extremes shape.
     *
     * The supported values are:
     * * `"circle"`&mdash;The marker shape is a circle.
     * * `"square"`&mdash;The marker shape is a square.
     * * `"triangle"`&mdash;The marker shape is a triangle.
     * * `"cross"`&mdash;The marker shape is a cross.
     */
    type?: MarkerType;
}
