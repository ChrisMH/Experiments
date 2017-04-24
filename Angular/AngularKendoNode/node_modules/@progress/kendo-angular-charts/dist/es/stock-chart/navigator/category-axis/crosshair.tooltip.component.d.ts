import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisCrosshairTooltipComponent } from '../../../chart/category-axis-item/crosshair.tooltip.component';
/**
 * The crosshair tooltip options.
 *
 * The crosshair tooltip is displayed when the visible option is set to `true`.
 */
export declare class NavigatorCategoryAxisCrosshairTooltipComponent extends CategoryAxisCrosshairTooltipComponent {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
