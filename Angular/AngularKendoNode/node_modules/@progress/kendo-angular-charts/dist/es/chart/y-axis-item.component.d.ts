import { CollectionService } from '../common/collection.service';
import { ConfigurationService } from '../common/configuration.service';
import { YAxisItemComponentGenerated } from './y-axis-item.component.generated';
/**
 * The configuration component for the X axis.
 */
export declare class YAxisItemComponent extends YAxisItemComponentGenerated {
    protected configurationService: ConfigurationService;
    protected collectionService: CollectionService;
    constructor(configurationService: ConfigurationService, collectionService: CollectionService);
}
