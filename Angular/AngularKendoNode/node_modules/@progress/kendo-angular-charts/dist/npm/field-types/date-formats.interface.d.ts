/**
 * The format used to display the labels when they are dates.
 *
 * The Chart chooses the appropriate format for the current `baseUnit`.
 * Setting the format option of the labels overrides the date formats.
 */
export interface DateFormats {
    /**
     * The format to use when the axis `baseUnit` is set to `"days"`.
     */
    days?: string;
    /**
     * The format to use when the axis `baseUnit` is set to `"hours"`.
     */
    hours?: string;
    /**
     * The format to use when the axis `baseUnit` is set to `"months"`.
     */
    months?: string;
    /**
     * The format to use when the axis `baseUnit` is set to `"weeks"`.
     */
    weeks?: string;
    /**
     * The format to use when the axis `baseUnit` is set to `"years"`.
     */
    years?: string;
}
