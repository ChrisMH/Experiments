import { Border, MarkerType } from '../../common/property-types';
/**
 * The xAxis.notes.icon options.
 */
export interface XAxisNotesIcon {
    /**
     * The background color of the notes icon.
     */
    background?: string;
    /**
     * The border of the icon.
     */
    border?: Border;
    /**
     * The size of the icon.
     */
    size?: number;
    /**
     * The icon shape.
     *
     * The supported values are:
     * * `"circle"`&mdash;The marker shape is a circle.
     * * `"square"`&mdash;The marker shape is a square.
     * * `"triangle"`&mdash;The marker shape is a triangle.
     * * `"cross"`&mdash;The marker shape is a cross.
     */
    type?: MarkerType;
    /**
     * The icon visibility.
     */
    visible?: boolean;
}
