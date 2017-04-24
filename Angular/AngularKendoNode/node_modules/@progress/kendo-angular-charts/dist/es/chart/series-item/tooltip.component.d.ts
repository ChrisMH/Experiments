import { TemplateRef } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesTooltipComponentGenerated } from '../series-item/tooltip.component.generated';
/**
 * The configuration options of the Chart series tooltip.
 *
 * The Chart series tooltip is displayed when the [`series.tooltip.visible`]({% slug api_charts_seriestooltipcomponent_kendouiforangular %}#toc-visible) option is set to `true`.
 */
export declare class SeriesTooltipComponent extends SeriesTooltipComponentGenerated {
    configurationService: ConfigurationService;
    seriesTooltipTemplate: TemplateRef<any>;
    constructor(configurationService: ConfigurationService);
    readonly seriesTooltipTemplateRef: TemplateRef<any>;
}
