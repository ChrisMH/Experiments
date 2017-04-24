import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisCrosshairComponent } from '../../../chart/category-axis-item/crosshair.component';
/**
 * The crosshair configuration options.
 */
export declare class NavigatorCategoryAxisCrosshairComponent extends CategoryAxisCrosshairComponent {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
