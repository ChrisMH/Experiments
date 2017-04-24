import { TemplateRef, ElementRef } from '@angular/core';
import { SeriesTooltipTemplateDirective } from './series-tooltip-template.directive';
import { SharedTooltipTemplateDirective } from './shared-tooltip-template.directive';
import { TooltipTemplatePoint } from './tooltip-template-point';
import { BaseTooltip } from './base-tooltip';
import { TooltipTemplateService } from '../../common/tooltip-template.service';
/**
 * @hidden
 */
export declare class TooltipPopupComponent extends BaseTooltip {
    private element;
    private templateService;
    seriesTooltipTemplateRef: TemplateRef<any>;
    seriesSharedTooltipTemplateRef: TemplateRef<any>;
    seriesTooltipContext: any;
    seriesSharedTooltipContext: any;
    shared: boolean;
    defaultSeriesTooltipTemplate: SeriesTooltipTemplateDirective;
    defaultSharedTooltipTemplate: SharedTooltipTemplateDirective;
    animate: boolean;
    classNames: any;
    wrapperClass: string;
    constructor(element: ElementRef, templateService: TooltipTemplateService);
    show(e: any): void;
    containsElement(element: any): boolean;
    protected sharedTemplateContext(e: any): any;
    protected pointTemplateRef(point: any): TemplateRef<any>;
    protected wrapPoints(points: Array<any>, format?: string): Array<TooltipTemplatePoint>;
}
