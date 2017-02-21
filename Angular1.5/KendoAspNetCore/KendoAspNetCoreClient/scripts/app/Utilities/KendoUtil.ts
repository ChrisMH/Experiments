import "kendo";
import { JsonObject, JsonMember } from "typedjson-npm";

export namespace KendoDataSource
{
    function createFilterParameterMap(root: string, data: kendo.data.DataSourceParameterMapDataFilter, dest: any): void
    {
        if (data.logic)
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
                const nextRoot = `${root}.filters[${index}]`;
                createFilterParameterMap(nextRoot, value, dest);
            });
        }
    }

    /**
     * Transforms data source parameters into a form that can be used by the WebApi model binders
     * 
     * @param data
     * @param type
     */
    export function createParameterMap(data: kendo.data.DataSourceTransportParameterMapData, type: string): any
    {
        const result = data;

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
}

export namespace KendoDropDown
{
    /**
     * Single dropdown value
     */
    @JsonObject
    export class Value
    {
        @JsonMember
        id: string;

        @JsonMember
        name: string;
    }
    
    /**
     * Configuration for a dropdown
     */
    @JsonObject
    export class Config
    {
        @JsonMember
        default: string;

        @JsonMember({ elements: Value })
        values: Value[];
    }
}


export namespace KendoGrid
{
    /**
     * Single column in a grid
     */
    @JsonObject
    export class Column
    {
        constructor(field?: string, title?: string, type?: string, width?: string | number, format?: string, aggregate?: string, footerHeader?: string, hidden?: boolean)
        {
            this.field = field;
            this.title = title;
            this.type = type;
            this.width = typeof width === "number" ? width.toString() : width;
            this.format = format;
            this.aggregate = aggregate;
            this.footerHeader = footerHeader;
            this.hidden = hidden;
        }

        @JsonMember
        field: string;

        @JsonMember
        title: string;

        @JsonMember
        type: string;

        @JsonMember
        width: string;

        @JsonMember
        format: string;

        @JsonMember
        aggregate: string;

        @JsonMember
        footerHeader: string;

        @JsonMember
        hidden: boolean;
    }


    /**
     * Configuration for a grid
     */
    @JsonObject
    export class Config
    {
        @JsonMember({ elements: Column })
        columns: Column[]
    }


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

    
    export function createColumn(gridColumn: Column): kendo.ui.GridColumn
    {
        if (!gridColumn)
            return null;

        switch (gridColumn.type)
        {
        case "number":
            return createNumberColumn(gridColumn);
        case "string":
            return createStringColumn(gridColumn);
        case "boolean":
            return createBooleanColumn(gridColumn);
        case "Date":
            return createDateColumn(gridColumn);
        default:
            return null;
        }
    }

    export function createColumns(gridColumns: Column[]): kendo.ui.GridColumn[]
    {
        const columns: kendo.ui.GridColumn[] = [];

        gridColumns.forEach((gridColumn: Column) =>
        {
            const column = createColumn(gridColumn);
            if (column)
                columns.push(column);
        });

        return columns;
    }

    export function createFields(gridColumns: Column[]): kendo.data.DataSourceSchemaModelFields
    {
        var fields: kendo.data.DataSourceSchemaModelFields = {};

        gridColumns.forEach((gridColumn: Column) =>
        {
            if (gridColumn.type)
                fields[gridColumn.field] = { type: gridColumn.type };
        });

        return fields;
    }

    export function createAggregates(gridColumns: Column[]): kendo.data.DataSourceAggregateItem[]
    {
        const aggregates: kendo.data.DataSourceAggregateItem[] = [];

        gridColumns.forEach((column: Column) =>
        {
            if (column.aggregate)
                aggregates.push({ field: column.field, aggregate: column.aggregate });
        });

        return aggregates;
    }

    function parseWidth(width: string | number): string | number
    {
        if (typeof width === "number")
            return width;

        const intWidth = parseInt(width as string);
        if (isNaN(intWidth))
            return width;
        return intWidth;
    }

    function createFooterTemplate(column: Column): string
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

    export function createStringColumn(column: Column): kendo.ui.GridColumn
    {
        return {
            field: column.field,
            title: column.title,
            width: parseWidth(column.width),
            footerTemplate: createFooterTemplate(column),
            hidden: column.hidden ? column.hidden : false
        } as kendo.ui.GridColumn;
    }

    export function createNumberColumn(column: Column): kendo.ui.GridColumn
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

    export function createBooleanColumn(column: Column): kendo.ui.GridColumn
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

    export function createDateColumn(column: Column): kendo.ui.GridColumn
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

export namespace KendoMultiSelect
{
    /**
     * Single MultiSelect value
     */
    @JsonObject
    export class Value
    {
        @JsonMember
        id: string;

        @JsonMember
        name: string;
    }


    /**
     * Configuration for a MultiSelect
     */
    @JsonObject
    export class Config
    {
        @JsonMember({ elements: String })
        default: string[];

        @JsonMember({ elements: Value })
        values: Value[];
    }
}