import { ConfigurationService } from '../../common/configuration.service';
import { SettingsComponent } from '../../common/settings.component';
import { NavigatorHint } from '../option-types';
/**
 * Default options for the navigator hint.
 */
export declare class NavigatorHintComponent extends SettingsComponent implements NavigatorHint {
    configurationService: ConfigurationService;
    content: (e: any) => string;
    format: string;
    visible: boolean;
    constructor(configurationService: ConfigurationService);
}
