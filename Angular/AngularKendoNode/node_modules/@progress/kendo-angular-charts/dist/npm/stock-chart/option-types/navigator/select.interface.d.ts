import { MousewheelSelect } from '../../../common/property-types';
/**
 * The `navigator.select` options.
 */
export interface NavigatorSelect {
    /**
     * The lower boundary of the selected range.
     */
    from?: Date;
    /**
     * The mousewheel configuration of the selection.
     *
     * If set to `false`, the mousewheel does not update the selection.
     */
    mousewheel?: boolean | MousewheelSelect;
    /**
     * The upper boundary of the selected range.
     */
    to?: Date;
}
