import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisSelectComponentGenerated } from '../category-axis-item/select.component.generated';
/**
 * The selected axis range. If set, the axis selection is enabled. The range is index-based and starts from 0.
 * Categories with indexes in the range ([`select.from`]({% slug api_charts_categoryaxisselectcomponent_kendouiforangular %}#toc-from) and
 * [`select.to`]({% slug api_charts_categoryaxisselectcomponent_kendouiforangular %}#toc-to)) will be selected.
 * That is, the last category in the range will not be included in the selection.
 * If the categories are dates, the range also has to be specified with date values.
 */
export declare class CategoryAxisSelectComponent extends CategoryAxisSelectComponentGenerated {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
