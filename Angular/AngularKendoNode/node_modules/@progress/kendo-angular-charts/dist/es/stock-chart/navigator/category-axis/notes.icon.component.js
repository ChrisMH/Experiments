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
import { CategoryAxisNotesIconComponent } from '../../../chart/category-axis-item/notes.icon.component';
/**
 * The icon of the notes.
 */
var NavigatorCategoryAxisNotesIconComponent = (function (_super) {
    __extends(NavigatorCategoryAxisNotesIconComponent, _super);
    function NavigatorCategoryAxisNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return NavigatorCategoryAxisNotesIconComponent;
}(CategoryAxisNotesIconComponent));
export { NavigatorCategoryAxisNotesIconComponent };
NavigatorCategoryAxisNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisNotesIconComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
