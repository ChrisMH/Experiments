import { StringFilterCellComponent } from './string-filter-cell.component';
import { NumericFilterCellComponent } from './numeric-filter-cell.component';
import { BooleanFilterCellComponent } from './boolean-filter-cell.component';
/**
 * @hidden
 *
 * > List the following components as `entryComponents` in the GridModule.
 */
export var filterComponentFactory = function (type) { return ({
    "boolean": BooleanFilterCellComponent,
    "numeric": NumericFilterCellComponent,
    "text": StringFilterCellComponent
}[type]); };
