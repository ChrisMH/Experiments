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
            new JsGridColumn("customerId", "Id", "string", 100),
            new JsGridColumn("customerName", "Customer Name", "string", 200)
        ];

        const dataSourceOptions = {
            //type: "json", //"odata-v4",
            serverFiltering: false,
            serverPaging: true,
            serverSorting: true,
            serverAggregates: false,
            pageSize: 25,
            transport: {
                read: {
                    url: () => `${this.appSettings.rootUrl}api/Database/Performance`,
                    //data: () => UrlQuery.toUrlObject(this.gridQuery),
                    dataType: "json"
                } as kendo.data.DataSourceTransportRead
            } as kendo.data.DataSourceTransport,

            schema: {
                data: (response: any) => response["data"]["rows"],
                total: (response: any) => response["data"]["count"],
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
