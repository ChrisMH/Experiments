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
import { ValueAxisNotesLabelComponentGenerated } from '../value-axis-item/notes.label.component.generated';
/**
 * The label of the notes.
 */
var ValueAxisNotesLabelComponent = (function (_super) {
    __extends(ValueAxisNotesLabelComponent, _super);
    // Place custom properties here
    function ValueAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return ValueAxisNotesLabelComponent;
}(ValueAxisNotesLabelComponentGenerated));
export { ValueAxisNotesLabelComponent };
ValueAxisNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisNotesLabelComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
