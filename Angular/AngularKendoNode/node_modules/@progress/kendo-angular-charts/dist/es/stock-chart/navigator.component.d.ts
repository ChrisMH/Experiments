import { ConfigurationService } from '../common/configuration.service';
import { SettingsComponent } from '../common/settings.component';
import { CategoryAxis, Pane, Series } from '../common/property-types';
import { Navigator, NavigatorHint, NavigatorSelect } from './option-types';
export declare class NavigatorComponent extends SettingsComponent implements Navigator {
    configurationService: ConfigurationService;
    visible: boolean;
    categoryAxis: CategoryAxis;
    hint: NavigatorHint;
    pane: Pane;
    select: NavigatorSelect;
    series: Series | Series[];
    constructor(configurationService: ConfigurationService);
}
