import { ChartComponent } from '../chart.component';
import { PreventableEvent } from './preventable-event';
import { AxisRange } from '../api-types/axis-range.interface';
/**
 * Arguments for the `zoom` event.
 */
export declare class ZoomEvent extends PreventableEvent {
    /**
     * A dictionary containing the range (min and max values) of named axes. The axis name is used as a key.
     */
    axisRanges: {
        [name: string]: AxisRange;
    };
    /**
     * A number that indicates the zoom amount and direction.
     * A negative value indicates a zoom-in action.
     * A positive value indicates a zoom-out action.
     */
    delta: number;
    /**
     * The original user event that triggered the drag action.
     */
    originalEvent: any;
    /**
     * @hidden
     */
    constructor(e: any, sender: ChartComponent);
}
