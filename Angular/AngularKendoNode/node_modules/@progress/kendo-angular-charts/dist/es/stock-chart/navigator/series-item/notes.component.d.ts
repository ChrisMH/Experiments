import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesNotesComponent } from '../../../chart/series-item/notes.component';
/**
 * The StockChart navigator series notes configuration.
 */
export declare class NavigatorSeriesNotesComponent extends SeriesNotesComponent {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
