"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var base_event_1 = require("./base-event");
/**
 * Arguments for the `dragEnd` event.
 */
var DragEndEvent = (function (_super) {
    __extends(DragEndEvent, _super);
    /**
     * @hidden
     */
    function DragEndEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axisRanges = e.axisRanges;
        _this.originalEvent = e.originalEvent;
        return _this;
    }
    return DragEndEvent;
}(base_event_1.BaseEvent));
exports.DragEndEvent = DragEndEvent;
