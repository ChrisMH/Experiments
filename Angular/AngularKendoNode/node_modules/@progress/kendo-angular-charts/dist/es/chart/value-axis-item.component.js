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
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CollectionService } from '../common/collection.service';
import { ConfigurationService } from '../common/configuration.service';
import { ValueAxisItemComponentGenerated } from './value-axis-item.component.generated';
/**
 * The configuration component for a value axis.
 */
var ValueAxisItemComponent = (function (_super) {
    __extends(ValueAxisItemComponent, _super);
    // Place custom properties here
    function ValueAxisItemComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    return ValueAxisItemComponent;
}(ValueAxisItemComponentGenerated));
export { ValueAxisItemComponent };
ValueAxisItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [ConfigurationService],
                selector: 'kendo-chart-value-axis-item',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisItemComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
    { type: CollectionService, },
]; };
