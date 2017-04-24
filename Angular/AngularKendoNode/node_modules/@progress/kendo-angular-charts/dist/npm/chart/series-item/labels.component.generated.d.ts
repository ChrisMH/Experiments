import { drawing } from '@progress/kendo-drawing';
import { ConfigurationService } from '../../common/configuration.service';
import { SettingsComponent } from '../../common/settings.component';
import { Border, Margin, Padding, SeriesLabelsVisualArgs } from '../../common/property-types';
import { SeriesLabelsFrom, SeriesLabelsTo, SeriesLabels } from '../../common/property-types';
/**
 * @hidden
 */
export declare abstract class SeriesLabelsComponentGenerated extends SettingsComponent implements SeriesLabels {
    configurationService: ConfigurationService;
    align: 'circle' | 'column' | 'center' | 'right' | 'left';
    background: string;
    border: Border;
    color: string;
    content: (e: any) => string;
    distance: number;
    font: string;
    format: string;
    margin: Margin | number;
    padding: Padding | number;
    /**
     * The position of the labels.
     *
     * - `"above"`&mdash;The label is positioned at the top of the marker. Applicable for series that render
     * points, including the Bubble series.
     * - `"below"`&mdash;The label is positioned at the bottom of the marker. Applicable for series that
     * render points, including the Bubble series.
     * - `"center"`&mdash;The label is positioned at the point center. Applicable for the Bar, Column, Donut, Pie,
     * Funnel, radarColumn, and Waterfall series.
     * - `"insideBase"`&mdash;The label is positioned inside, near the base of the bar. Applicable for the Bar,
     * Column, and Waterfall series.
     * - `"insideEnd"`&mdash;The label is positioned inside, near the end of the point. Applicable for the Bar,
     * Column, Donut, Pie, radarColumn, and Waterfall series.
     * - `"left"`&mdash;The label is positioned to the left of the marker. Applicable for series that render
     * points, including the Bubble series.
     * - `"outsideEnd"`&mdash;The label is positioned outside, near the end of the point. Applicable for the Bar,
     * Column, Donut, Pie, radarColumn, and Waterfall series. Not applicable for stacked series.
     * - `"right"`&mdash;The label is positioned to the right of the marker. Applicable for series that render
     * points, including the Bubble series.
     * - `"top"`&mdash;The label is positioned at the top of the segment. Applicable for the Funnel series.
     * - `"bottom"`&mdash;The label is positioned at the bottom of the segment. Applicable for the Funnel series.
     *
     */
    position: 'above' | 'below' | 'center' | 'insideBase' | 'insideEnd' | 'left' | 'outsideEnd' | 'right' | 'top' | 'bottom';
    visible: boolean;
    visual: (e: SeriesLabelsVisualArgs) => drawing.Element;
    from: SeriesLabelsFrom;
    to: SeriesLabelsTo;
    constructor(configurationService: ConfigurationService);
}
