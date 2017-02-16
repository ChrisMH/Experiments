import * as angular from "angular";
import "kendo";

import { AppSettings } from "../../Services";
import { JsGridColumn } from "../../Models";
import { KendoUtil, UrlQuery } from "../../Utilities";

import "./Grid.css";

export class Grid implements angular.IController
{
    protected grid: kendo.ui.Grid;
    protected gridOptions: kendo.ui.GridOptions;

    static $inject = ["appSettings"];

    constructor(protected appSettings: AppSettings)
    {
    }

    $onInit(): void
    {
        this.gridOptions = this.createGridOptions();
    }

    private createGridOptions(): kendo.ui.GridOptions
    {
        var columns = [
            new JsGridColumn("customerId", "Id", "string", undefined, undefined, undefined, undefined, true),
            new JsGridColumn("customerName", "Customer Name", "string", "*", undefined, "count", "Count:"),
            new JsGridColumn("statTime", "time", "Date", 160, "MM/dd/yyyy hh:mm tt"),
            new JsGridColumn("backlog", "Backlog", "number", 100, "n0", "average", "Avg:"),
            new JsGridColumn("lastReceivedOn", "Last Rx", "Date", 160, "MM/dd/yyyy hh:mm tt"),
            new JsGridColumn("totalReceived", "Total Rx", "number", 100, "n0", "max", "Max:"),
            new JsGridColumn("databaseConnections", "Db Conn", "number", 100, "n0", "sum", "Sum:"),
            new JsGridColumn("idleDatabaseConnections", "Idle Db Conn", "number", 100),
            new JsGridColumn("pctProcessorTime", "Pct Processor", "number", 100, "n2"),
            new JsGridColumn("availableMBytes", "MBytes", "number", 100, "n0", "min", "Min:"),
            new JsGridColumn("pctPagingFileUsage", "Pct Paging", "number", 100, "n2")
        ];

        const dataSourceOptions = {
            //type: "json", //"odata-v4",
            serverAggregates: true,
            serverFiltering: false,
            serverGrouping: false,
            serverPaging: true,
            serverSorting: true,
            pageSize: 25,
            transport: {
                read: {
                    url: () => `${this.appSettings.rootUrl}api/Database/Performance`,
                    //data: () => UrlQuery.toUrlObject(this.gridQuery),
                    dataType: "json"
                } as kendo.data.DataSourceTransportRead,
                parameterMap: (data: kendo.data.DataSourceTransportParameterMapData, type: string) => KendoUtil.createParameterMap(data, type)
            } as kendo.data.DataSourceTransport,

            schema: {
                data: (response: any) => response["data"]["data"],
                total: (response: any) => response["data"]["count"],
                aggregates: (response: any) => response["data"]["aggregates"],
                model: { fields: KendoUtil.createFields(columns) }
            },
            sort: { field: "customerName", dir: "asc" },
            aggregate: KendoUtil.createAggregates(columns)

        } as kendo.data.DataSourceOptions;

        const options = {
            columns: KendoUtil.createColumns(columns),
            filterable: { extra: false },
            
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            
            scrollable: true,
            sortable: true,
            autoBind: true,
            dataSource: kendo.data.DataSource.create(dataSourceOptions)//,
            //dataBound: (e: kendo.ui.GridDataBoundEvent) => this.onGridDataBound(e)
        } as kendo.ui.GridOptions;

        return options;
    }

    /*
    private createGridOptions(): kendo.ui.GridOptions
    {
        const dataSourceOptions = {
            type: "json", //"odata-v4",
            serverFiltering: true,
            serverPaging: true,
            serverSorting: true,
            serverAggregates: true,
            pageSize: 25,
            transport: {
                read: {
                    url: () => `${this.appSettings.rootUrl}odata/Controls/PatentAssets`,
                    data: () => UrlQuery.toUrlObject(this.gridQuery),
                    dataType: "json"
                } as kendo.data.DataSourceTransportRead
            } as kendo.data.DataSourceTransport,

            schema: {
                data: "value",
                total: function (data: any) { return data["@odata.count"]; },
                model: { fields: KendoUtil.createFields(gridConfig.columns) }
            },
            //sort: { field: "totalCount", dir: "desc" },
            aggregate: KendoUtil.createAggregates(gridConfig.columns)

        } as kendo.data.DataSourceOptions;

        const options = {
            columns: KendoUtil.createColumns(gridConfig.columns),
            filterable: { extra: false },
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            scrollable: false,
            sortable: true,
            autoBind: false,
            dataSource: kendo.data.DataSource.create(dataSourceOptions),
            dataBound: (e: kendo.ui.GridDataBoundEvent) => this.onGridDataBound(e)
        } as kendo.ui.GridOptions;

        return options;
    }
    */
}
