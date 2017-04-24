import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesHighlightComponent } from '../../../chart/series-item/highlight.component';
/**
 * The highlighting configuration options for the StockChart series.
 */
export declare class NavigatorSeriesHighlightComponent extends SeriesHighlightComponent {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
