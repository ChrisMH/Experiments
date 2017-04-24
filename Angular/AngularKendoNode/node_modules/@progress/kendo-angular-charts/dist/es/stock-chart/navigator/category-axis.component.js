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
import { ConfigurationService } from '../../common/configuration.service';
import { PrefixConfigurationService, PREFIX } from '../../common/prefix-configuration.service';
import { CategoryAxisItemComponent } from '../../chart/category-axis-item.component';
/**
 * The configuration component for the navigator category axis.
 */
var NavigatorCategoryAxisComponent = (function (_super) {
    __extends(NavigatorCategoryAxisComponent, _super);
    function NavigatorCategoryAxisComponent(configurationService) {
        var _this = _super.call(this, configurationService, null) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return NavigatorCategoryAxisComponent;
}(CategoryAxisItemComponent));
export { NavigatorCategoryAxisComponent };
NavigatorCategoryAxisComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{
                        provide: PREFIX,
                        useValue: 'navigator.categoryAxis'
                    }, {
                        provide: ConfigurationService,
                        useClass: PrefixConfigurationService
                    }],
                selector: 'kendo-chart-navigator-category-axis',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
