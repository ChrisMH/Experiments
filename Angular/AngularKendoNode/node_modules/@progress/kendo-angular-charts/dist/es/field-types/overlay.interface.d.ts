/**
 * Appearance settings for the overlay of the series elements.
 */
export interface Overlay {
    /**
     * The Chart series gradient.
     *
     * The supported values are:
     * * `"glass"` (Bar, Column, and Candlestick series)
     * * `"none"`
     * * `"roundedBevel"` (Donut and Pie series)
     * * `"sharpBevel"` (Donut and Pie series)
     */
    gradient?: 'glass' | 'none' | 'roundedBevel' | 'sharpBevel';
}
