import { MousewheelSelect } from '../../common/property-types';
/**
 * The categoryAxis.select options.
 */
export interface CategoryAxisSelect {
    /**
     * The lower boundary of the selected range.
     */
    from?: any;
    /**
     * The maximum value which the user can select.
     */
    max?: any;
    /**
     * The minimum value which the user can select.
     */
    min?: any;
    /**
     * The mousewheel configuration of the selection.
     */
    mousewheel?: MousewheelSelect;
    /**
     * The upper boundary of the selected range.
     * The category with the specified index (date) is not included in the selected range
     * unless the axis is justified. To select all categories, set
     * a value larger than the last category index (date).
     */
    to?: any;
}
