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
import { ConfigurationService } from '../common/configuration.service';
import { ZoomableComponentGenerated } from './zoomable.component.generated';
/**
 * Specifies if the Chart can be zoomed.
 */
var ZoomableComponent = (function (_super) {
    __extends(ZoomableComponent, _super);
    // Place custom properties here
    function ZoomableComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return ZoomableComponent;
}(ZoomableComponentGenerated));
export { ZoomableComponent };
ZoomableComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-zoomable',
                template: ''
            },] },
];
/** @nocollapse */
ZoomableComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
