var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesHighlightComponentGenerated } from '../series-item/highlight.component.generated';
/**
 * The Chart series highlighting configuration options.
 */
var SeriesHighlightComponent = (function (_super) {
    __extends(SeriesHighlightComponent, _super);
    // Place custom properties here
    function SeriesHighlightComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return SeriesHighlightComponent;
}(SeriesHighlightComponentGenerated));
export { SeriesHighlightComponent };
SeriesHighlightComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-highlight',
                template: ''
            },] },
];
/** @nocollapse */
SeriesHighlightComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
