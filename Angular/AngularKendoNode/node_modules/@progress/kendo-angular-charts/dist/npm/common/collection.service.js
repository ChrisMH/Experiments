"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
/**
 * @hidden
 */
var ItemChange = (function () {
    function ItemChange(sender, options) {
        this.sender = sender;
        this.options = options;
    }
    return ItemChange;
}());
exports.ItemChange = ItemChange;
/**
 * @hidden
 */
var CollectionService = (function () {
    function CollectionService() {
        this.source = new Subject_1.Subject();
        this.onItemChange$ = this.source.asObservable();
    }
    CollectionService.prototype.notify = function (change) {
        this.source.next(change);
    };
    return CollectionService;
}());
CollectionService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
CollectionService.ctorParameters = function () { return []; };
exports.CollectionService = CollectionService;
