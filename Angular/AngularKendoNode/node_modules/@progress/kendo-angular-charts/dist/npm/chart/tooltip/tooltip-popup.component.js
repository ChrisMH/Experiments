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
var core_1 = require("@angular/core");
var series_tooltip_template_directive_1 = require("./series-tooltip-template.directive");
var shared_tooltip_template_directive_1 = require("./shared-tooltip-template.directive");
var tooltip_template_point_1 = require("./tooltip-template-point");
var base_tooltip_1 = require("./base-tooltip");
var has_parent_1 = require("../../common/has-parent");
var tooltip_template_service_1 = require("../../common/tooltip-template.service");
var SHARED_TOOLTIP_CLASS = 'k-chart-shared-tooltip';
// Codelyzer 2.0.0-beta2 doesn't handle inherited members
/* tslint:disable:no-access-missing-member */
/**
 * @hidden
 */
var TooltipPopupComponent = (function (_super) {
    __extends(TooltipPopupComponent, _super);
    function TooltipPopupComponent(element, templateService) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.templateService = templateService;
        _this.seriesTooltipContext = {};
        _this.seriesSharedTooltipContext = {};
        _this.animate = true;
        _this.wrapperClass = 'k-chart-tooltip-wrapper';
        return _this;
    }
    TooltipPopupComponent.prototype.show = function (e) {
        _super.prototype.show.call(this, e);
        this.shared = e.shared;
        this.popupClasses[SHARED_TOOLTIP_CLASS] = e.shared;
        if (!e.shared) {
            this.seriesTooltipContext = new tooltip_template_point_1.TooltipTemplatePoint(e.point, e.format);
            this.seriesTooltipTemplateRef = this.pointTemplateRef(e.point);
        }
        else {
            this.seriesSharedTooltipTemplateRef = this.templateService.getSharedTemplate()
                || this.defaultSharedTooltipTemplate.templateRef;
            this.seriesSharedTooltipContext = this.sharedTemplateContext(e);
        }
    };
    TooltipPopupComponent.prototype.containsElement = function (element) {
        var tooltipElement = this.element.nativeElement;
        return has_parent_1.hasParent(element, tooltipElement);
    };
    TooltipPopupComponent.prototype.sharedTemplateContext = function (e) {
        var points = e.points;
        var nameColumn = points.filter(function (point) { return typeof point.series.name !== 'undefined'; }).length > 0;
        var colorMarker = e.series.length > 1;
        var colspan = 1;
        if (nameColumn) {
            colspan++;
        }
        if (colorMarker) {
            colspan++;
        }
        return {
            category: e.category,
            categoryText: e.categoryText,
            colorMarker: colorMarker,
            colspan: colspan,
            nameColumn: nameColumn,
            points: this.wrapPoints(e.points, e.format)
        };
    };
    TooltipPopupComponent.prototype.pointTemplateRef = function (point) {
        return this.templateService.getTemplate(point.series.index) || this.defaultSeriesTooltipTemplate.templateRef;
    };
    TooltipPopupComponent.prototype.wrapPoints = function (points, format) {
        var result = [];
        for (var idx = 0; idx < points.length; idx++) {
            var point = points[idx];
            var template = this.pointTemplateRef(point);
            var pointFormat = ((point.options || {}).tooltip || {}).format || format;
            result.push(new tooltip_template_point_1.TooltipTemplatePoint(point, pointFormat, template));
        }
        return result;
    };
    return TooltipPopupComponent;
}(base_tooltip_1.BaseTooltip));
TooltipPopupComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'kendo-chart-tooltip-popup',
                template: "\n    <kendo-popup [offset]=\"offset\" [popupAlign]=\"align\" [collision]=\"collision\" [animate]=\"animate\" *ngIf=\"active\" >\n        <div [ngClass]=\"popupClasses\" [ngStyle]=\"style\">\n          <ng-template [ngTemplateOutlet]=\"seriesTooltipTemplateRef\" *ngIf=\"!shared\"\n                    [ngOutletContext]=\"seriesTooltipContext\">\n          </ng-template>\n          <ng-template [ngTemplateOutlet]=\"seriesSharedTooltipTemplateRef\" *ngIf=\"shared\"\n                    [ngOutletContext]=\"seriesSharedTooltipContext\">\n          </ng-template>\n        </div>\n    </kendo-popup>\n    <ng-template kendoChartSeriesTooltipTemplate let-formattedValue=\"formattedValue\">\n        <span [innerHTML]=\"formattedValue\"></span>\n    </ng-template>\n    <ng-template kendoChartSharedTooltipTemplate let-points=\"points\" let-categoryText=\"categoryText\" let-colspan=\"colspan\" let-colorMarker=\"colorMarker\" let-nameColumn=\"nameColumn\" >\n        <table>\n            <tr><th [attr.colspan]='colspan'> {{ categoryText }} </th></tr>\n            <tr *ngFor=\"let point of points\">\n                <td *ngIf=\"colorMarker\"><span class='k-chart-shared-tooltip-marker' [style.background-color]='point.series.color'></span></td>\n                <td *ngIf=\"nameColumn\">\n                    <ng-container *ngIf=\"point.series.name !== undefined\">{{ point.series.name }}</ng-container>\n                    <ng-container *ngIf=\"point.series.name === undefined\">&nbsp;</ng-container>\n                </td>\n                <td>\n                  <ng-template [ngTemplateOutlet]=\"point.template\"\n                            [ngOutletContext]=\"point\">\n                  </ng-template>\n                </td>\n            </tr>\n        </table>\n    </ng-template>\n    "
            },] },
];
/** @nocollapse */
TooltipPopupComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: tooltip_template_service_1.TooltipTemplateService, },
]; };
TooltipPopupComponent.propDecorators = {
    'defaultSeriesTooltipTemplate': [{ type: core_1.ViewChild, args: [series_tooltip_template_directive_1.SeriesTooltipTemplateDirective,] },],
    'defaultSharedTooltipTemplate': [{ type: core_1.ViewChild, args: [shared_tooltip_template_directive_1.SharedTooltipTemplateDirective,] },],
    'animate': [{ type: core_1.Input },],
    'classNames': [{ type: core_1.Input },],
    'wrapperClass': [{ type: core_1.HostBinding, args: ['class',] }, { type: core_1.Input },],
};
exports.TooltipPopupComponent = TooltipPopupComponent;
