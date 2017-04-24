import { OpaqueToken } from '@angular/core';
import { ConfigurationService, Change } from './configuration.service';
import { RootConfigurationService } from './root-configuration.service';
/**
 * @hidden
 */
export declare const PREFIX: OpaqueToken;
/**
 * @hidden
 */
export declare class PrefixConfigurationService extends ConfigurationService {
    protected rootService: RootConfigurationService;
    protected prefix: string;
    constructor(rootService: RootConfigurationService, prefix: string);
    push(store: any): void;
    notify(change: Change): void;
}
