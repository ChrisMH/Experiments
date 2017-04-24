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
var preventable_event_1 = require("./preventable-event");
/**
 * Arguments for the `dragStart` event.
 */
var DragStartEvent = (function (_super) {
    __extends(DragStartEvent, _super);
    /**
     * @hidden
     */
    function DragStartEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axisRanges = e.axisRanges;
        _this.originalEvent = e.originalEvent;
        return _this;
    }
    return DragStartEvent;
}(preventable_event_1.PreventableEvent));
exports.DragStartEvent = DragStartEvent;
