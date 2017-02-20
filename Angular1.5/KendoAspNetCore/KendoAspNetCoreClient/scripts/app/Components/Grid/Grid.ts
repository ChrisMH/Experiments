import * as angular from "angular";
import "kendo";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";

import { AppSettings, HttpService, IHttpServiceResponse } from "../../Services";
import { KendoUtil, UrlQuery } from "../../Utilities";

import "./Grid.css";

export class Grid implements angular.IController
{
    protected filter: kendo.ui.DropDownList;
    protected filterOptions: kendo.ui.DropDownListOptions;

    protected grid: kendo.ui.Grid;
    protected gridOptions: kendo.ui.GridOptions;
    protected gridConfigId: number;

    static $inject = ["$timeout", "appSettings", "httpService"];

    constructor(protected $timeout: angular.ITimeoutService,
        protected appSettings: AppSettings,
        protected httpService: HttpService)
    {
    }

    $onInit(): void
    {
        this.httpService.get(this.appSettings.rootUrl.concat("api/Grid/FilterConfig"),
            (data: string) => data ? TypedJSON.parse(data, FilterConfigResponse) : null)
            .then((result: KendoUtil.DropdownConfig) =>
            {
                this.filterOptions = this.createFilterOptions(result);
                this.$timeout(() => this.refreshGrid());
            });
    }

    private refreshGrid(): void
    {
        let gridQuery = new GridQuery();
        gridQuery.filter = parseInt(this.filter.value());
        
        this.httpService.get(this.appSettings.rootUrl.concat("api/Grid/GridConfig"),
            (data: string) => data ? TypedJSON.parse(data, GridConfigResponse) : null,
            UrlQuery.toUrlObject(gridQuery))
            .then((result: KendoUtil.GridConfig) =>
            {
                
                if (this.gridOptions == null)
                {
                    // gridOptions will be null when the grid is first created.  
                    // Initialize gridConfigId *before* gridOptions so that rebind isn't triggered.
                    this.gridConfigId = gridQuery.filter;
                    this.gridOptions = this.createGridOptions(result);
                }
                else
                {
                    // gridOptions will be non-null every other time.  
                    // Initialize gridConfigId *after* gridOptions to trigger rebind.
                    this.gridOptions = this.createGridOptions(result);
                    this.gridConfigId = gridQuery.filter;
                }
            });
    }

    private onFilterChanged(e: kendo.ui.DropDownListChangeEvent): void
    {
        this.refreshGrid();
    }
    
    private createFilterOptions(config: KendoUtil.DropdownConfig): kendo.ui.DropDownListOptions
    {
        let index = config.values.findIndex((value: KendoUtil.DropdownValue) => value.id === config.default);

        return {
            dataValueField: "id",
            dataTextField: "name",
            dataSource: { data: config.values },
            index: index,
            change: (e: kendo.ui.DropDownListChangeEvent) => this.onFilterChanged(e)
        } as kendo.ui.DropDownListOptions;
    }

    private createGridOptions(config: KendoUtil.GridConfig): kendo.ui.GridOptions
    {
        const dataSourceOptions = {
            serverAggregates: true,
            serverFiltering: true,
            serverGrouping: true,
            serverPaging: true,
            serverSorting: true,
            pageSize: 25,
            transport: {
                read: {
                    url: () => `${this.appSettings.rootUrl}api/Grid/Data`,
                    //data: () => UrlQuery.toUrlObject(this.gridQuery),
                    dataType: "json"
                } as kendo.data.DataSourceTransportRead,
                parameterMap: (data: kendo.data.DataSourceTransportParameterMapData, type: string) => KendoUtil.createParameterMap(data, type)
            } as kendo.data.DataSourceTransport,

            schema: {
                data: (response: any) => response["data"]["data"],
                total: (response: any) => response["data"]["count"],
                aggregates: (response: any) => response["data"]["aggregates"],
                model: { fields: KendoUtil.createFields(config.columns) }
            },
            sort: { field: "customerName", dir: "asc" },
            aggregate: KendoUtil.createAggregates(config.columns)

        } as kendo.data.DataSourceOptions;

        const options = {
            columns: KendoUtil.createColumns(config.columns),
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
}

class GridQuery
{
    @UrlQuery.UrlQueryParam(UrlQuery.IntConverter)
    filter: number;
}

@JsonObject
class FilterConfigResponse implements IHttpServiceResponse<KendoUtil.DropdownConfig>
{
    @JsonMember
    success: boolean;

    @JsonMember
    message: string;

    @JsonMember
    data: KendoUtil.DropdownConfig;
}

@JsonObject
class GridConfigResponse implements IHttpServiceResponse<KendoUtil.GridConfig>
{
    @JsonMember
    success: boolean;

    @JsonMember
    message: string;

    @JsonMember
    data: KendoUtil.GridConfig;
}
