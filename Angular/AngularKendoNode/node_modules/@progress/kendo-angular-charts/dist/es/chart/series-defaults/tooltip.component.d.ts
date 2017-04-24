import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsTooltipComponentGenerated } from '../series-defaults/tooltip.component.generated';
/**
 * The configuration options of the Chart series tooltip.
 *
 * The Chart series tooltip is displayed when the [`seriesDefaults.tooltip.visible`]({% slug api_charts_seriesdefaultstooltipcomponent_kendouiforangular %}#toc-visible) option is set to `true`.
 */
export declare class SeriesDefaultsTooltipComponent extends SeriesDefaultsTooltipComponentGenerated {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
