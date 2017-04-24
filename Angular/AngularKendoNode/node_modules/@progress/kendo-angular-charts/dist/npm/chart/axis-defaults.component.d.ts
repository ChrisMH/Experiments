import { ConfigurationService } from '../common/configuration.service';
import { AxisDefaultsComponentGenerated } from './axis-defaults.component.generated';
/**
 * The default options for all Chart axes. Accepts the options supported by [`categoryAxis`]({% slug api_charts_categoryaxisitemcomponent_kendouiforangular %}), [`valueAxis`]({% slug api_charts_valueaxisitemcomponent_kendouiforangular %}), [`xAxis`]({% slug api_charts_xaxisitemcomponent_kendouiforangular %}), and [`yAxis`]({% slug api_charts_yaxisitemcomponent_kendouiforangular %}).
 */
export declare class AxisDefaultsComponent extends AxisDefaultsComponentGenerated {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
