import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisLabelsComponent } from '../../../chart/category-axis-item/labels.component';
/**
 * The axis labels configuration.
 */
export declare class NavigatorCategoryAxisLabelsComponent extends CategoryAxisLabelsComponent {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
