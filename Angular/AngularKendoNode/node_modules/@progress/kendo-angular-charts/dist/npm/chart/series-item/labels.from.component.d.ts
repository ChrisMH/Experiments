import { ConfigurationService } from '../../common/configuration.service';
import { SeriesLabelsFromComponentGenerated } from '../series-item/labels.from.component.generated';
/**
 * The Chart series from label configuration.
 */
export declare class SeriesLabelsFromComponent extends SeriesLabelsFromComponentGenerated {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
