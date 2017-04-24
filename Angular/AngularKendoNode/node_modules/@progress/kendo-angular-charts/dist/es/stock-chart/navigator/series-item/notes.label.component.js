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
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesNotesLabelComponent } from '../../../chart/series-item/notes.label.component';
/**
 * The label of the notes.
 */
var NavigatorSeriesNotesLabelComponent = (function (_super) {
    __extends(NavigatorSeriesNotesLabelComponent, _super);
    function NavigatorSeriesNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return NavigatorSeriesNotesLabelComponent;
}(SeriesNotesLabelComponent));
export { NavigatorSeriesNotesLabelComponent };
NavigatorSeriesNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesNotesLabelComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
