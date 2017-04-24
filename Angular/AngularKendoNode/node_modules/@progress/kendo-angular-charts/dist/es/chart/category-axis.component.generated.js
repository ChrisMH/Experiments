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
import { ContentChildren } from '@angular/core';
import { CollectionComponent } from '../common/collection.component';
import { CategoryAxisItemComponent } from './category-axis-item.component';
/**
 * @hidden
 */
var CategoryAxisComponentGenerated = (function (_super) {
    __extends(CategoryAxisComponentGenerated, _super);
    function CategoryAxisComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'categoryAxis', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    return CategoryAxisComponentGenerated;
}(CollectionComponent));
export { CategoryAxisComponentGenerated };
CategoryAxisComponentGenerated.propDecorators = {
    'children': [{ type: ContentChildren, args: [CategoryAxisItemComponent,] },],
};
