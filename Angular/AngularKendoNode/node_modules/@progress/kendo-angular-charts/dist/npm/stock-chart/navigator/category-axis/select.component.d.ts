import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisSelectComponent } from '../../../chart/category-axis-item/select.component';
/**
 * The selected axis range. If set, the axis selection is enabled. The range is index-based and starts from 0.
 * Categories with indexes in the range (`select.from`, `select.to`) will be selected.
 * That is, the last category in the range will not be included in the selection.
 * If the categories are dates, the range also has to be specified with date values.
 */
export declare class NavigatorCategoryAxisSelectComponent extends CategoryAxisSelectComponent {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
