import "kendo";

import { JsGridConfigModel, JsGridColumn } from "../Models";

export namespace KendoUtil
{
    export function resizeGrid(selector: string): void
    {
        const gridElement = $(selector);
        const dataArea = gridElement.find(".k-grid-content");
        const gridHeight = gridElement.innerHeight();
        const otherElements = gridElement.children().not(".k-grid-content");
        let otherElementsHeight = 0;
        otherElements.each((i: number, elem: Element) =>
        {
            otherElementsHeight += $(elem).outerHeight();
        });
        dataArea.height(gridHeight - otherElementsHeight);
    }

    export function createColumn(gridColumn: JsGridColumn): kendo.ui.GridColumn
    {
        if (!gridColumn)
            return null;

        switch (gridColumn.type)
        {
            case "number":
                return KendoUtil.createNumberColumn(gridColumn);
            case "string":
                return KendoUtil.createStringColumn(gridColumn);
            case "boolean":
                return KendoUtil.createBooleanColumn(gridColumn);
            case "Date":
                return KendoUtil.createDateColumn(gridColumn);
            default:
                return null;
        }
    }

    export function createColumns(gridColumns: JsGridColumn[]): kendo.ui.GridColumn[]
    {
        let columns: kendo.ui.GridColumn[] = [];

        gridColumns.forEach((gridColumn: JsGridColumn) =>
        {
            let column = createColumn(gridColumn);
            if (column)
                columns.push(column);
        });

        return columns;
    }

    export function createFields(gridColumns: JsGridColumn[]): kendo.data.DataSourceSchemaModelFields
    {
        var fields: kendo.data.DataSourceSchemaModelFields = {};

        gridColumns.forEach((gridColumn: JsGridColumn) =>
        {
            if (gridColumn.type)
                fields[gridColumn.field] = { type: gridColumn.type };
        });

        return fields;
    }

    export function createAggregates(gridColumns: JsGridColumn[]): kendo.data.DataSourceAggregateItem[]
    {
        let aggregates: kendo.data.DataSourceAggregateItem[] = [];

        gridColumns.forEach((column: JsGridColumn) =>
        {
            if (column.aggregate)
                aggregates.push({field: column.field, aggregate: column.aggregate });
        });

        return aggregates;
    }

    function parseWidth(width: string | number): string | number
    {
        if (typeof width === "number")
            return width;

        let intWidth = parseInt(width);
        if (intWidth === NaN)
            return width;
        return intWidth;
    }


    export function createStringColumn(column: JsGridColumn): kendo.ui.GridColumn
    {
        return {
            field: column.field,
            title: column.title,
            width: parseWidth(column.width),
            //footerTemplate: column.aggregate ? `<div style='text-align:right'>#=${column.aggregate})#</div>` : undefined,
            hidden: column.hidden ? column.hidden : false
        } as kendo.ui.GridColumn;
    }

    export function createNumberColumn(column: JsGridColumn): kendo.ui.GridColumn
    {
        return {
            field: column.field,
            title: column.title,
            width: parseWidth(column.width),
            template: `<div style='text-align:right'>#=kendo.toString(${column.field}, '${column.format}')#</div>`,
            footerTemplate: column.aggregate ? `<div style='text-align:right'>#=kendo.toString(${column.aggregate}, '${column.format}')#</div>` : undefined,
            filterable: { ui: (el: any) => el.kendoNumericTextBox({ format: `"${column.format}"` }) },
            hidden: column.hidden ? column.hidden : false
        } as kendo.ui.GridColumn;
    }

    export function createBooleanColumn(column: JsGridColumn): kendo.ui.GridColumn
    {
        return {
            field: column.field,  
            title: column.title,
            width: parseWidth(column.width),
            template: `#=${column.field} ? 'Yes' : 'No'#`,
            //footerTemplate: aggregate ? `<div style='text-align:right'>#=${aggregate})#</div>` : undefined,
            hidden: column.hidden ? column.hidden : false
        } as kendo.ui.GridColumn;
    }

    export function createDateColumn(column: JsGridColumn): kendo.ui.GridColumn
    {
        return {
            field: column.field,
            title: column.title,
            width: parseWidth(column.width),
            template: `<div style='text-align:right'>#=kendo.toString(kendo.parseDate(${column.field}), '${column.format}')#</div>`,
            hidden: column.hidden ? column.hidden : false
        } as kendo.ui.GridColumn;
    }
}