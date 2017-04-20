import * as angular from "angular";
import "kendo";
import * as moment from "moment";

import { AppSettings } from "../../Services";
import { KendoDataSource } from "../../Utilities";

import "./AreaChart.css";


export class AreaChart implements angular.IController
{
    protected chart: kendo.dataviz.ui.Chart;
    protected chartOptions: kendo.dataviz.ui.ChartOptions;

    protected titleFont = "bold 16px Open Sans Condensed, sans-serif";
    protected labelFont = "bold 12px Open Sans Condensed, sans-serif";

    static $inject = ["$scope", "$window", "appSettings"];

    constructor(protected $scope: angular.IScope,
        protected $window: angular.IWindowService,
        protected appSettings: AppSettings)
    {
    }

    $onInit()
    {
        angular.element(this.$window).bind("resize", () => this.onResize());

        this.showProgress(true);
        this.chartOptions = this.createChartOptions();
    }

    private onResize(): void
    {
        if (this.chart)
            this.chart.resize();
    }

    protected showProgress(show: boolean): void
    {
        var progress = $(`div#chart-div #chart-progress`);
        if (!progress)
            return;

        kendo.ui.progress(progress, show);
    }

    private createChartOptions(): kendo.dataviz.ui.ChartOptions
    {
        var dataSourceOptions = {
            //serverSorting: true,
            transport: {
                read: {
                    url: () => `${this.appSettings.rootUrl}api/AreaChart/ChartData`,
                    //data: () => UrlQuery.toUrlObject(this.gridQuery),
                    dataType: "json"
                } as kendo.data.DataSourceTransportRead,
                parameterMap: (data: kendo.data.DataSourceTransportParameterMapData, type: string) => KendoDataSource.createParameterMap(data, type)
            } as kendo.data.DataSourceTransport,

            group: [
                { field: "customerName" }
            ],

            //sort: [ 
            //    { field: "customerName", dir: "asc" },
            //    { field: "statTime", dir: "asc" }
            //],
            schema: {
                data: (response: any) => response["data"]["items"]
            }
        } as kendo.data.DataSourceOptions;

        let options =
            {
                theme: "bootstrap",
                title: {
                    text: "Backlog By Customer",
                    font: this.titleFont
                },
                legend: {
                    position: "bottom"
                },
                series: [
                    {
                        type: "area",
                        name: "#= group.value =#",
                        field: "backlog",
                        categoryField: "statTime"
                    }
                ],
                valueAxis: [
                    {
                        title:
                        {
                            text: "GWh",
                            font: this.titleFont
                        },
                        labels:
                        {
                            format: "{0:n0}",
                            font: this.labelFont
                        }
                    }
                ],
                categoryAxis: [
                    {
                        title:
                        {
                            text: "Date",
                            font: this.titleFont
                        },
                        baseUnit: "months",
                        baseUnitStep: 1,
                        //labels:
                        //{
                        //    step: 4,
                        //    rotation: -45,
                        //    format: "{0: M/yy}",
                        //    font: this.labelFont
                        //},
                        majorGridLines: false,
                        minorGridLines: false
                    }
                ],
                tooltip: {
                    visible: true
                    //template: "#= kendo.toString(category, 'MM/dd/yyyy hh:mm tt') # - Backlog: #= value #"
                },
                autoBind: true,
                dataSource: new kendo.data.DataSource(dataSourceOptions),
                render: (e: kendo.dataviz.ui.ChartRenderEvent) => this.showProgress(false)
            } as kendo.dataviz.ui.ChartOptions;

        return options;
    }
}