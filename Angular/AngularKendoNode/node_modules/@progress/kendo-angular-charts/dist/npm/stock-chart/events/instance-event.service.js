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
var instance_event_service_1 = require("../../events/instance-event.service");
var navigator_filter_event_1 = require("./navigator-filter-event");
var EVENT_MAP = {
    navigatorFilter: navigator_filter_event_1.NavigatorFilterEvent
};
/**
 * @hidden
 */
var StockInstanceEventService = (function (_super) {
    __extends(StockInstanceEventService, _super);
    function StockInstanceEventService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockInstanceEventService.prototype.create = function (name, args, sender) {
        if (EVENT_MAP[name]) {
            return new EVENT_MAP[name](args, sender);
        }
        return _super.prototype.create.call(this, name, args, sender);
    };
    return StockInstanceEventService;
}(instance_event_service_1.InstanceEventService));
exports.StockInstanceEventService = StockInstanceEventService;
