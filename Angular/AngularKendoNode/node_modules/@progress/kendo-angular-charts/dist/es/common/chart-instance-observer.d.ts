import { NgZone } from '@angular/core';
import { InstanceObserver } from '@progress/kendo-charts';
/**
 * @hidden
 */
export declare class ChartInstanceObserver extends InstanceObserver {
    protected ngZone: NgZone;
    protected handlerMap: any;
    constructor(ngZone: NgZone, observer: any);
    callObserver(fnName: string, ...args: any[]): boolean;
}
