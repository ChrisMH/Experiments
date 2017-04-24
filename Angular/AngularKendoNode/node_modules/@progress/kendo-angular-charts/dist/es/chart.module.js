import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ResizeSensorModule } from '@progress/kendo-angular-resize-sensor';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';
import { ThemeService } from './common/theme.service';
import { TooltipTemplateService } from './common/tooltip-template.service';
import { CHART_DIRECTIVES } from './chart.directives';
/**
 * A [module](https://angular.io/docs/ts/latest/guide/ngmodule.html) that includes the Chart component and directives.
 *
 * Imports the ChartModule into your application
 * [root module](https://angular.io/docs/ts/latest/guide/ngmodule.html#!#angular-modularity) or any other sub-module
 * that will use the Chart component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { ChartModule } from '@progress/kendo-angular-charts';
 * import { AppComponent } from './app.component';
 *
 * @@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, ChartModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
var ChartModule = (function () {
    function ChartModule() {
    }
    return ChartModule;
}());
export { ChartModule };
ChartModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CHART_DIRECTIVES],
                exports: [CHART_DIRECTIVES],
                imports: [CommonModule, PopupModule, ResizeSensorModule],
                providers: [
                    { provide: IntlService, useClass: CldrIntlService },
                    ThemeService,
                    TooltipTemplateService
                ]
            },] },
];
/** @nocollapse */
ChartModule.ctorParameters = function () { return []; };
