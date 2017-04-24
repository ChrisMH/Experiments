import { DashType } from './dash-type';
/**
 * Appearance settings for the note connecting lines.
 */
export interface NoteLine {
    /**
     * The color of the note line. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The dash type of the note line.
     */
    dashType?: DashType;
    /**
     * The length of the connecting lines in pixels.
     */
    length?: number;
    /**
     * The width of the connecting lines in pixels.
     */
    width?: number;
}
