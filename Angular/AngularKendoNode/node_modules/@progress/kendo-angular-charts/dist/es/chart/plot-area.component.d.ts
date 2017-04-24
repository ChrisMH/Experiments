import { ConfigurationService } from '../common/configuration.service';
import { PlotAreaComponentGenerated } from './plot-area.component.generated';
/**
 * The plot area configuration options. The plot area is the area which displays the series.
 */
export declare class PlotAreaComponent extends PlotAreaComponentGenerated {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
