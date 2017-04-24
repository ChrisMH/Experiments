import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsLabelsToComponentGenerated } from '../series-defaults/labels.to.component.generated';
/**
 * The Chart series to label configuration.
 */
export declare class SeriesDefaultsLabelsToComponent extends SeriesDefaultsLabelsToComponentGenerated {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
