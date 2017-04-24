import { NgModule } from '@angular/core';
import { ChartModule } from './chart.module';
import { StockChartModule } from './stock-chart.module';
import { SparklineModule } from './sparkline.module';
/**
 * A [module](https://angular.io/docs/ts/latest/guide/ngmodule.html) that includes all Chart components and directives.
 *
 * Imports the ChartsModule into your application
 * [root module](https://angular.io/docs/ts/latest/guide/ngmodule.html#!#angular-modularity) or any other sub-module
 * that will use the Charts components.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { ChartsModule } from '@progress/kendo-angular-charts';
 * import { AppComponent } from './app.component';
 *
 * @@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, ChartsModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
var ChartsModule = (function () {
    function ChartsModule() {
    }
    return ChartsModule;
}());
export { ChartsModule };
ChartsModule.decorators = [
    { type: NgModule, args: [{
                exports: [ChartModule, SparklineModule, StockChartModule]
            },] },
];
/** @nocollapse */
ChartsModule.ctorParameters = function () { return []; };
