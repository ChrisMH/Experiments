import * as angular from "angular";
import "kendo";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";

import { AppSettings, HttpService, IHttpServiceResponse, SessionStoreService } from "../../Services";
import { KendoDataSource, KendoDropDown, KendoGrid, UrlQuery } from "../../Utilities";

import "./Grid.css";


@JsonObject
class GridSessionStore
{
    @JsonMember
    dataSet: string;

    @JsonMember
    gridConfig: KendoGrid.Config;
}

export class Grid implements angular.IController
{
    protected dataSet: kendo.ui.DropDownList;
    protected dataSetOptions: kendo.ui.DropDownListOptions;

    protected grid: kendo.ui.Grid;
    protected gridOptions: kendo.ui.GridOptions;
    protected gridConfigId: number;
    protected gridQuery: GridQuery;

    private destroyMessage: () => void;
    private newStateMessage: () => void;
    private changedStateMessage: () => void;

    static $inject = ["$location", "$rootScope", "$scope", "$timeout", "$window", "appSettings", "httpService", "sessionStoreService"];

    constructor(protected $location: angular.ILocationService,
        protected $rootScope: angular.IRootScopeService,
        protected $scope: angular.IScope,
        protected $timeout: angular.ITimeoutService,
        protected $window: angular.IWindowService,
        protected appSettings: AppSettings,
        protected httpService: HttpService,
        protected sessionStoreService: SessionStoreService    )
    {
    }
    
    static sessionKey = "grid";
    
    $onInit(): void
    {
        this.gridQuery = new GridQuery();

        this.destroyMessage = this.$scope.$on("$destroy", () => this.$onDestroy());

        this.newStateMessage = this.$rootScope.$on(SessionStoreService.newStateMessage, (e: angular.IAngularEvent) => this.onNewSessionState(e));
        this.changedStateMessage = this.$rootScope.$on(SessionStoreService.changedStateMessage, (e: angular.IAngularEvent) => this.onChangedSessionState(e));


        this.httpService.get(this.appSettings.rootUrl.concat("api/Grid/GetDataSetConfig"),
                (data: string) => data ? TypedJSON.parse(data, FilterConfigResponse) : null)
            .then((config: KendoDropDown.Config) =>
            {
                let stateData = this.loadStateData();
                if (stateData && stateData.dataSet)
                    config.default = stateData.dataSet;

                this.gridQuery.dataSet = config.default;

                this.dataSetOptions = this.createDataSetOptions(config);

                this.refreshGrid(stateData)
                    .then(() =>
                    {
                        this.$timeout(() => this.saveStateData()); // $timeout runs after the next digest cycle
                    });
            });
    }

    $onDestroy(): void
    {
        if (this.destroyMessage)
        {
            this.destroyMessage();
            this.destroyMessage = undefined;
        }

        if (this.newStateMessage)
        {
            this.newStateMessage();
            this.newStateMessage = undefined;
        }

        if (this.changedStateMessage)
        {
            this.changedStateMessage();
            this.changedStateMessage = null;
        }
    }
    
    

    private refreshGrid(stateData?: GridSessionStore): angular.IPromise<void>
    {
        return this.httpService.get(this.appSettings.rootUrl.concat("api/Grid/GetGridConfig"),
            (data: string) => data ? TypedJSON.parse(data, GridConfigResponse) : null,
            UrlQuery.toUrlObject(this.gridQuery))
            .then((config: KendoGrid.Config) =>
            {
                if (stateData && stateData.gridConfig)
                {
                    KendoGrid.combineConfig(stateData.gridConfig, config);
                }

                if (this.gridOptions == null)
                {
                    // gridOptions will be null when the grid is first created.  
                    // Initialize gridConfigId *before* gridOptions so that rebind isn't triggered.
                    this.gridConfigId = 0;
                    this.gridOptions = this.createGridOptions(config);
                }
                else
                {
                    // gridOptions will be non-null every other time.  
                    // Initialize gridConfigId *after* gridOptions to trigger rebind.
                    this.gridOptions = this.createGridOptions(config);
                    this.gridConfigId++;
                }
            });
    }

    private loadStateData(): GridSessionStore
    {
        let storedData = this.sessionStoreService.load(Grid.sessionKey);
        if (!storedData) return undefined;
        return TypedJSON.parse(storedData, GridSessionStore);
    }

    private saveStateData(): boolean
    {
        let stateData = new GridSessionStore();
        stateData.dataSet = this.dataSet ? this.dataSet.value() : undefined;
        stateData.gridConfig = KendoGrid.getConfigForSession(this.grid);

        let storedData = TypedJSON.stringify(stateData);

        return this.sessionStoreService.save(Grid.sessionKey, storedData);
    }

    private onNewSessionState(e: angular.IAngularEvent): void
    {
        //console.log(`Grid.onNewSessionState`);

        this.saveStateData();
    }


    private onChangedSessionState(e: angular.IAngularEvent): void
    {
        //console.log(`Grid.onChangedSessionState`);

        let stateData = this.loadStateData();
        if (!stateData)
            return;

        if (stateData.dataSet)
        {
            this.dataSet.value(stateData.dataSet);
            this.gridQuery.dataSet = stateData.dataSet;
        }

        this.refreshGrid(stateData);
    }

    private onDataSetChange(): void
    {
        this.gridQuery.dataSet = this.dataSet.value();
        this.refreshGrid(this.loadStateData())
            .then(() =>
            {
                this.sessionStoreService.createNewState();
            });
    }

    private createDataSetOptions(config: KendoDropDown.Config): kendo.ui.DropDownListOptions
    {
        return {
            dataValueField: "id",
            dataTextField: "name",
            dataSource: { data: config.values },
            value: config.default,
            change: () => this.onDataSetChange()
        } as kendo.ui.DropDownListOptions;
    }

    private gridFiltering = false;
    private onGridFilter(e: kendo.ui.GridFilterEvent): void
    {
        this.gridFiltering = true;
    }

    private gridPaging = false;
    private onGridPage(e: kendo.ui.GridPageEvent): void
    {
        this.gridPaging = true;
    }

    private gridSorting = false;
    private onGridSort(e: kendo.ui.GridSortEvent): void
    {
        this.gridSorting = true;
    }

    private onGridDataBound(e: kendo.ui.GridDataBoundEvent): void
    {
        if (this.gridFiltering || this.gridPaging || this.gridSorting)
            this.sessionStoreService.createNewState();

        this.gridFiltering = false;
        this.gridPaging = false;
        this.gridSorting = false;
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
            aggregate: KendoGrid.createAggregates(config.columns),

            filter: config.filter,
            page: config.page,
            sort: config.sort ? config.sort : [{ field: "customerName", dir: "asc" }],
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

            dataBound: (e: kendo.ui.GridDataBoundEvent) => this.onGridDataBound(e),
            filter: (e: kendo.ui.GridFilterEvent) => this.onGridFilter(e),
            page: (e: kendo.ui.GridPageEvent) => this.onGridPage(e),
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
