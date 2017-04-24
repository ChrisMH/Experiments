import { Group } from '@progress/kendo-drawing';
/**
 * An interface for the Chart panes.
 */
export interface ChartPane {
    /**
     * The group holding the Drawing elements of the Chart.
     */
    chartsVisual: Group;
    /**
     * The Drawing group used to draw the pane.
     */
    visual: Group;
}
