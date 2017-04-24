import { ConfigurationService } from '../../common/configuration.service';
import { SettingsComponent } from '../../common/settings.component';
import { MousewheelSelect } from '../../common/property-types';
import { NavigatorSelect } from '../option-types';
/**
 * Specifies the initially selected range.
 *
 * The full range of values is shown if no range is specified.
 */
export declare class NavigatorSelectComponent extends SettingsComponent implements NavigatorSelect {
    configurationService: ConfigurationService;
    from: Date;
    to: Date;
    mousewheel: MousewheelSelect;
    constructor(configurationService: ConfigurationService);
}
