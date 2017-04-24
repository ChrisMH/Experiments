import { drawing } from '@progress/kendo-drawing';
/**
 * The context for the highlight toggle function.
 */
export interface HighlightToggleArgs {
    /**
     * A function that can be used to prevent showing the default highlight overlay.
     */
    preventDefault: () => void;
    /**
     * A Boolean value indicating whether the highlight has to be shown.
     */
    show: boolean;
    /**
     * The visual element that needs to be highlighted.
     */
    visual: drawing.Element;
    /**
     * The point category.
     */
    category: any;
    /**
     * The point dataItem.
     */
    dataItem?: any;
    /**
     * The point value.
     */
    value: any;
    /**
     * The point series.
     */
    series?: any;
}
