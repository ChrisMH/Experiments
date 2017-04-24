import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisNotesComponent } from '../../../chart/category-axis-item/notes.component';
/**
 * The notes configuration of the category axis.
 */
export declare class NavigatorCategoryAxisNotesComponent extends CategoryAxisNotesComponent {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
