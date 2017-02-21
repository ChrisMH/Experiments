import * as angular from "angular";
import "kendo";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";

import { AppSettings, HttpService, IHttpServiceResponse } from "../../Services";
import { KendoDropDown, KendoGrid, UrlQuery } from "../../Utilities";

import "./Grid.css";

export class Grid implements angular.IController
{
    protected filter: kendo.ui.DropDownList;
    protected filterOptions: kendo.ui.DropDownListOptions;

    protected grid: kendo.ui.Grid;
    protected gridOptions: kendo.ui.GridOptions;
    protected gridConfigId: string;
    protected gridQuery: GridQuery;

    static $inject = ["$timeout", "appSettings", "httpService"];

    constructor(protected $timeout: angular.ITimeoutService,
        protected appSettings: AppSettings,
        protected httpService: HttpService)
    {
    }

    $onInit(): void
    {
        this.gridQuery = new GridQuery();

        this.httpService.get(this.appSettings.rootUrl.concat("api/Grid/FilterConfig"),
            (data: string) => data ? TypedJSON.parse(data, FilterConfigResponse) : null)
            .then((config: KendoDropDown.Config) =>
            {
                this.filterOptions = this.createFilterOptions(config);
                this.$timeout(() => this.onFilterChange());
            });
    }

    private refreshGrid(): void
    {
        this.httpService.get(this.appSettings.rootUrl.concat("api/Grid/GridConfig"),
            (data: string) => data ? TypedJSON.parse(data, GridConfigResponse) : null,
            UrlQuery.toUrlObject(this.gridQuery))
            .then((config: KendoGrid.Config) =>
            {
                if (this.gridOptions == null)
                {
                    // gridOptions will be null when the grid is first created.  
                    // Initialize gridConfigId *before* gridOptions so that rebind isn't triggered.
                    this.gridConfigId = this.gridQuery.dataSet;
                    this.gridOptions = this.createGridOptions(config);
                }
                else
                {
                    // gridOptions will be non-null every other time.  
                    // Initialize gridConfigId *after* gridOptions to trigger rebind.
                    this.gridOptions = this.createGridOptions(config);
                    this.gridConfigId = this.gridQuery.dataSet;
                }
            });
    }

    private onFilterChange(): void
    {
        this.gridQuery.dataSet = this.filter.value();
        this.refreshGrid();
    }
    
    private createFilterOptions(config: KendoDropDown.Config): kendo.ui.DropDownListOptions
    {
        return {
            dataValueField: "id",
            dataTextField: "name",
            dataSource: { data: config.values },
            value: config.default,
            change: () => this.onFilterChange()
        } as kendo.ui.DropDownListOptions;
    }

    private createGridOptions(config: KendoGrid.Config): kendo.ui.GridOptions
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
                    url: () => `${this.appSettings.rootUrl}api/Grid/GridData`,
                    data: () => UrlQuery.toUrlObject(this.gridQuery),
                    dataType: "json"
                } as kendo.data.DataSourceTransportRead,
                parameterMap: (data: kendo.data.DataSourceTransportParameterMapData, type: string) => KendoGrid.createParameterMap(data, type)
            } as kendo.data.DataSourceTransport,

            schema: {
                data: (response: any) => response["data"]["data"],
                total: (response: any) => response["data"]["count"],
                aggregates: (response: any) => response["data"]["aggregates"],
                model: { fields: KendoGrid.createFields(config.columns) }
            },
            sort: { field: "customerName", dir: "asc" },
            aggregate: KendoGrid.createAggregates(config.columns)

        } as kendo.data.DataSourceOptions;

        const options = {
            columns: KendoGrid.createColumns(config.columns),
            filterable: { extra: false },
            
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            
            scrollable: true,
            sortable: true,
            autoBind: true,
            dataSource: kendo.data.DataSource.create(dataSourceOptions)
        } as kendo.ui.GridOptions;

        return options;
    }
}

class GridQuery
{
    @UrlQuery.UrlQueryParam(UrlQuery.StringConverter)
    dataSet: string;
}

@JsonObject
class FilterConfigResponse implements IHttpServiceResponse<KendoDropDown.Config>
{
    @JsonMember
    success: boolean;

    @JsonMember
    message: string;

    @JsonMember
    data: KendoDropDown.Config;
}

@JsonObject
class GridConfigResponse implements IHttpServiceResponse<KendoGrid.Config>
{
    @JsonMember
    success: boolean;

    @JsonMember
    message: string;

    @JsonMember
    data: KendoGrid.Config;
}
