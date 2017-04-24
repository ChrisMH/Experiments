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
import { SeriesMarkersComponentGenerated } from '../series-item/markers.component.generated';
/**
 * The Chart series marker configuration.
 */
var SeriesMarkersComponent = (function (_super) {
    __extends(SeriesMarkersComponent, _super);
    // Place custom properties here
    function SeriesMarkersComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return SeriesMarkersComponent;
}(SeriesMarkersComponentGenerated));
export { SeriesMarkersComponent };
SeriesMarkersComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-markers',
                template: ''
            },] },
];
/** @nocollapse */
SeriesMarkersComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
