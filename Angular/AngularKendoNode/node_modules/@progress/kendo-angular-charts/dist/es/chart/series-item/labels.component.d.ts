import { ConfigurationService } from '../../common/configuration.service';
import { SeriesLabelsComponentGenerated } from '../series-item/labels.component.generated';
/**
 * The Chart series label configuration.
 */
export declare class SeriesLabelsComponent extends SeriesLabelsComponentGenerated {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
