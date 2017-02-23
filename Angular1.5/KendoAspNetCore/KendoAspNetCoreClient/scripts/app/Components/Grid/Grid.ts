import * as angular from "angular";
import "kendo";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";

import { AppSettings, HttpService, IHttpServiceResponse } from "../../Services";
import { KendoDataSource, KendoDropDown, KendoGrid, UrlQuery } from "../../Utilities";

import "./Grid.css";


@JsonObject
class SessionStore
{
    @JsonMember
    dataSet: string;

    //@JsonMember({ elements: KendoGrid.Sort })
    //sort: KendoGrid.Sort[];
}

export class Grid implements angular.IController
{
    protected dataSet: kendo.ui.DropDownList;
    protected dataSetOptions: kendo.ui.DropDownListOptions;

    protected grid: kendo.ui.Grid;
    protected gridOptions: kendo.ui.GridOptions;
    protected gridConfigId: string;
    protected gridQuery: GridQuery;

    protected sessionData: SessionStore;

    private locationChangeSuccess: () => any;

    static $inject = ["$location", "$rootScope", "$state", "$timeout", "$window", "appSettings", "httpService"];

    constructor(protected $location: angular.ILocationService,
        protected $rootScope: angular.IRootScopeService,
        protected $state: angular.ui.IStateService,
        protected $timeout: angular.ITimeoutService,
        protected $window: angular.IWindowService,
        protected appSettings: AppSettings,
        protected httpService: HttpService)
    {
    }
    
    static lastSessionIdKey: string = "lastSessionId";
    static sessionIdKey: string = "sid";

    getNextSessionId(): string
    {
        let id = this.$window.sessionStorage[Grid.lastSessionIdKey];
        if (id)
        {
            id = parseInt(id);
            if (isNaN(id))
                id = 0;
        }
        else
        {
            id = 0;
        }

        let nextId = (++id).toString();
        this.$window.sessionStorage[Grid.lastSessionIdKey] = nextId;
        return nextId;
    }


    loadSessionData(id: string): SessionStore
    {
        if (!id)
            return undefined;

        let storedSession = this.$window.sessionStorage[id];
        if (storedSession)
            return TypedJSON.parse(storedSession, SessionStore);
        return undefined;
    }

    storeSessionData(id: string, data: SessionStore): void
    {
        this.$window.sessionStorage[id] = TypedJSON.stringify(data);
    }


    getDataToStoreInSession(): SessionStore
    {
        var gridOptions = this.grid ? this.grid.getOptions() : undefined;

        let sessionStore = {
            dataSet: this.dataSet ? this.dataSet.value() : undefined
            //sort: gridOptions ? gridOptions.dataSource.sort : []
        };

        return sessionStore;
    }

    updateHash(id: string): void
    {
        if (this.locationChangeSuccess)
            this.locationChangeSuccess();

        this.$location.hash(id);
        this.$rootScope.$apply();

        this.locationChangeSuccess = this.$rootScope.$on("$locationChangeSuccess", () => this.onLocationChangeSuccess());
    }

    $onInit(): void
    {
        console.log(`$onInit : sessionId=${this.$location.hash()}`);

        this.gridQuery = new GridQuery();

        this.sessionData = this.loadSessionData(this.$location.hash());

        this.locationChangeSuccess = this.$rootScope.$on("$locationChangeSuccess", () => this.onLocationChangeSuccess());
        
        this.httpService.get(this.appSettings.rootUrl.concat("api/Grid/GetDataSetConfig"),
            (data: string) => data ? TypedJSON.parse(data, FilterConfigResponse) : null)
            .then((config: KendoDropDown.Config) =>
            {
                if (this.sessionData && this.sessionData.dataSet)
                    config.default = this.sessionData.dataSet;

                this.gridQuery.dataSet = config.default;

                this.dataSetOptions = this.createFilterOptions(config);
                this.$timeout(() => this.refreshGrid());
            });
    }

    private onLocationChangeSuccess(): void
    {
        console.log(`onLocationChangeSuccess : sessionId=${this.$location.hash()}`);
        this.sessionData = this.loadSessionData(this.$location.hash());

        this.applySessionData();
    }

    private applySessionData()
    {
        console.log(`applySessionData`);

        if (!this.sessionData)
            return;

        if (this.sessionData.dataSet && this.sessionData.dataSet !== this.dataSet.value())
        {
            this.dataSet.value(this.sessionData.dataSet);
            this.gridQuery.dataSet = this.sessionData.dataSet;
            this.refreshGrid();
        }
    }

    private refreshGrid(): void
    {
        this.httpService.get(this.appSettings.rootUrl.concat("api/Grid/GetGridConfig"),
            (data: string) => data ? TypedJSON.parse(data, GridConfigResponse) : null,
            UrlQuery.toUrlObject(this.gridQuery))
            .then((config: KendoGrid.Config) =>
            {
                //var session = this.retrieveSession(this.sessionId);
                //if (session)
                //{
                //    config.sort = session.sort;
                //}

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

    private onDataSetChange(): void
    {
        console.log(`onDataSetChange`);

        let id = this.getNextSessionId();
        let data = this.getDataToStoreInSession();
        this.storeSessionData(id, data);
        this.updateHash(id);

        this.gridQuery.dataSet = this.dataSet.value();
        this.refreshGrid();
    }

    private onGridSort(e: kendo.ui.GridSortEvent): void
    {
        //console.log(e.sort);

        //let id = this.getNextSessionId();

        //let sessionStore = this.getSessionStore();

        //if (sessionStore.sort && sessionStore.sort.length)
        //{
        //    let existingIndex = sessionStore.sort.findIndex((value: KendoGrid.Sort) => value.field === e.sort.field);
        //    if (existingIndex >= 0)
        //        sessionStore.sort[existingIndex].dir = e.sort.dir;
        //    else
        //        sessionStore.sort.push(e.sort as KendoGrid.Sort);
        //}

        //this.$window.sessionStorage[id] = TypedJSON.stringify(sessionStore);

        ///*
        //let params = {};
        //params[Grid.sessionIdKey] = id;
        //this.$state.go("Grid", params, { notify: false });
        //*/
        ////this.$location.search(Grid.sessionIdKey, id);
        //this.$location.hash(id);
    }

    private createFilterOptions(config: KendoDropDown.Config): kendo.ui.DropDownListOptions
    {
        return {
            dataValueField: "id",
            dataTextField: "name",
            dataSource: { data: config.values },
            value: config.default,
            change: () => this.onDataSetChange()
        } as kendo.ui.DropDownListOptions;
    }

    private createGridOptions(config: KendoGrid.Config): kendo.ui.GridOptions
    {
        const dataSourceOptions = {
            serverAggregates: true,
            serverFiltering: true,
            serverGrouping: false,
            serverPaging: true,
            serverSorting: true,
            pageSize: 25,
            transport: {
                read: {
                    url: () => `${this.appSettings.rootUrl}api/Grid/GetGridData`,
                    data: () => UrlQuery.toUrlObject(this.gridQuery),
                    dataType: "json"
                } as kendo.data.DataSourceTransportRead,
                parameterMap: (data: kendo.data.DataSourceTransportParameterMapData, type: string) => KendoDataSource.createParameterMap(data, type)
            } as kendo.data.DataSourceTransport,

            schema: {
                data: (response: any) => response["data"]["items"],
                total: (response: any) => response["data"]["count"],
                aggregates: (response: any) => response["data"]["aggregates"],
                model: { fields: KendoGrid.createFields(config.columns) }
            },
            sort: config.sort ? config.sort : [ { field: "customerName", dir: "asc" } ],
            aggregate: KendoGrid.createAggregates(config.columns)

        } as kendo.data.DataSourceOptions;

        const options = {
            columns: KendoGrid.createColumns(config.columns),
            filterable: { extra: false },
            //groupable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            scrollable: true,
            sortable: true,
            autoBind: true,
            dataSource: kendo.data.DataSource.create(dataSourceOptions),

            sort: (e: kendo.ui.GridSortEvent) => this.onGridSort(e)
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
