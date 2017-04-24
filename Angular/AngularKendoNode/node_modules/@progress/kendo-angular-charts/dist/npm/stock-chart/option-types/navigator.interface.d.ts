import { CategoryAxis, Pane, Series } from '../../common/property-types';
import { NavigatorHint } from './navigator/hint.interface';
import { NavigatorSelect } from './navigator/select.interface';
/**
 * The navigator options.
 */
export interface Navigator {
    /**
     * The visibility of the navigator.
     */
    visible?: boolean;
    /**
     * The category axis configuration options.
     */
    categoryAxis?: CategoryAxis;
    /**
     * Default options for the navigator hint.
     */
    hint?: NavigatorHint;
    /**
     * The navigator pane configuration.
     */
    pane?: Pane;
    /**
     * Specifies the initially selected range.
     *
     * The full range of values is shown if no range is specified.
     */
    select?: NavigatorSelect;
    /**
     * Array of series definitions.
     *
     * Accepts the same options as the root series collection.
     *
     * Omitting the array and specifying a single series is also acceptable.
     */
    series?: Series | Series[];
}
