import { ConfigurationService } from '../../common/configuration.service';
import { SeriesLabelsToComponentGenerated } from '../series-item/labels.to.component.generated';
/**
 * The Chart series to label configuration.
 */
export declare class SeriesLabelsToComponent extends SeriesLabelsToComponentGenerated {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
