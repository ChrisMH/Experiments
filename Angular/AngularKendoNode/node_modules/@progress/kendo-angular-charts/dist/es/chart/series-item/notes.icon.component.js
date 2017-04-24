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
import { SeriesNotesIconComponentGenerated } from '../series-item/notes.icon.component.generated';
/**
 * The icon of the notes.
 */
var SeriesNotesIconComponent = (function (_super) {
    __extends(SeriesNotesIconComponent, _super);
    // Place custom properties here
    function SeriesNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return SeriesNotesIconComponent;
}(SeriesNotesIconComponentGenerated));
export { SeriesNotesIconComponent };
SeriesNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
SeriesNotesIconComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
