import { ChartComponent } from '../chart.component';
import { drawing, geometry } from '@progress/kendo-drawing';
/**
 * The context for the error bars visual function.
 */
export interface ErrorBarsVisualArgs {
    /**
     * A function that can be used to get the default visual.
     */
    createVisual: () => drawing.Element;
    /**
     * The error bar high value.
     */
    high: number;
    /**
     * The error bar low value.
     */
    low: number;
    /**
     * The error bar options object.
     */
    options: any;
    /**
     * The rectangle that defines the normal position of the visual.
     */
    rect: geometry.Rect;
    /**
     * The instance of the Chart component.
     */
    sender: ChartComponent;
}
