import { CollectionService } from '../common/collection.service';
import { ConfigurationService } from '../common/configuration.service';
import { PaneComponentGenerated } from './pane.component.generated';
/**
 * The configuration component for a Chart pane.
 */
export declare class PaneComponent extends PaneComponentGenerated {
    protected configurationService: ConfigurationService;
    protected collectionService: CollectionService;
    constructor(configurationService: ConfigurationService, collectionService: CollectionService);
}
