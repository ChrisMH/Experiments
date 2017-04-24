import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
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
export { ItemChange };
/**
 * @hidden
 */
var CollectionService = (function () {
    function CollectionService() {
        this.source = new Subject();
        this.onItemChange$ = this.source.asObservable();
    }
    CollectionService.prototype.notify = function (change) {
        this.source.next(change);
    };
    return CollectionService;
}());
export { CollectionService };
CollectionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CollectionService.ctorParameters = function () { return []; };
