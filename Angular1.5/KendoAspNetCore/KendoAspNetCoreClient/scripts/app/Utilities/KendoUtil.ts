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

    function createFilterParameterMap(root: string, data: kendo.data.DataSourceParameterMapDataFilter, dest: any): void
    {
        if(data.logic)
            dest[`${root}.logic`] = data.logic;

        if (data.field)
            dest[`${root}.field`] = data.field;

        if (data.operator)
            dest[`${root}.operator`] = data.operator;

        if (data.value)
            dest[`${root}.value`] = data.value;

        if (data.filters)
        {
            data.filters.forEach((value: kendo.data.DataSourceParameterMapDataFilter, index: number) =>
            {
                let nextRoot = `${root}.filters[${index}]`;
                createFilterParameterMap(nextRoot, value, dest);
            });
        }
        
    }
    /**
     * Transforms grid parameters into a form that can be used by the WebApi model binders
     * 
     * @param data
     * @param type
     */
    export function createParameterMap(data: kendo.data.DataSourceTransportParameterMapData, type: string): any
    {
        let result = data;

        delete result["pageSize"];
        delete result["page"];

        if (result.sort)
        {
            result.sort.forEach((value: kendo.data.DataSourceParameterMapDataSort, index: number) =>
            {
                result[`sort[${index}].field`] = value.field;
                result[`sort[${index}].dir`] = value.dir;
            });

            delete result["sort"];
        }

        if (result.aggregate)
        {
            result.aggregate.forEach((value: kendo.data.DataSourceParameterMapDataAggregate, index: number) =>
            {
                result[`aggregate[${index}].field`] = value.field;
                result[`aggregate[${index}].aggregate`] = value.aggregate;
            });

            delete result["aggregate"];
        }

        if (result.filter)
        {
            createFilterParameterMap("filter", result.filter, result);
            delete result["filter"];
        }
        /*
            interface DataSourceParameterMapDataFilter {
        field?: string;
        filters?: DataSourceParameterMapDataFilter[];
        logic?: string;
        operator?: string;
        value?: any;
    }
        */

        return result;
        /*
                aggregate?: DataSourceParameterMapDataAggregate[];
        group?: DataSourceParameterMapDataGroup[];
        filter?: DataSourceParameterMapDataFilter;
        models?: Model[];
        page?: number;
        pageSize?: number;
        skip?: number;
        sort?: DataSourceParameterMapDataSort[];
        take?: number;
        */
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

        let intWidth = parseInt(width as string);
        if (isNaN(intWidth))
            return width;
        return intWidth;
    }

    function createFooterTemplate(column: JsGridColumn): string
    {
        if (!column.aggregate)
            return undefined;

        if (column.footerHeader && column.format)
            return `<div style='text-align:right'>#='${column.footerHeader} '.concat(kendo.toString(${column.aggregate}, '${column.format}'))#</div>`;
        else if (column.footerHeader)
            return `<div style='text-align:right'>#='${column.footerHeader} '.concat(${column.aggregate})#</div>`;
        else if (column.format)
            return `<div style='text-align:right'>#=kendo.toString(${column.aggregate}, '${column.format}')#</div>`;

        return `<div style='text-align:right'>#=${column.aggregate}#</div>`;
    }

    export function createStringColumn(column: JsGridColumn): kendo.ui.GridColumn
    {
        return {
            field: column.field,
            title: column.title,
            width: parseWidth(column.width),
            footerTemplate: createFooterTemplate(column),
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
            footerTemplate: createFooterTemplate(column),
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