import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/auditTime';
/**
 * @hidden
 */
export declare const THROTTLE_MS: number;
/**
 * @hidden
 */
export declare class Change {
    key: string;
    value: any;
    constructor(key: string, value: any);
}
/**
 * @hidden
 */
export declare class ConfigurationService {
    onChange$: Observable<any>;
    onFastChange$: Observable<any>;
    store: any;
    protected source: BehaviorSubject<any>;
    constructor();
    protected initSource(): void;
    push(store: any): void;
    notify(change: Change): void;
}
