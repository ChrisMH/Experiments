import * as angular from "angular";
import "kendo";
import * as moment from "moment";

import { AppSettings } from "../../Services";

import "./AreaChart.css";

let spainElectricity = [
    {
        "country": "Spain",
        "year": "2008",
        "unit": "GWh",
        "solar": 2578,
        "hydro": 26112,
        "wind": 32203,
        "nuclear": 58973
    },
    {
        "country": "Spain",
        "year": "2007",
        "unit": "GWh",
        "solar": 508,
        "hydro": 30522,
        "wind": 27568,
        "nuclear": 55103
    },
    {
        "country": "Spain",
        "year": "2006",
        "unit": "GWh",
        "solar": 119,
        "hydro": 29831,
        "wind": 23297,
        "nuclear": 60126
    },
    {
        "country": "Spain",
        "year": "2005",
        "unit": "GWh",
        "solar": 41,
        "hydro": 23025,
        "wind": 21176,
        "nuclear": 57539
    },
    {
        "country": "Spain",
        "year": "2004",
        "unit": "GWh",
        "solar": 56,
        "hydro": 34439,
        "wind": 15700,
        "nuclear": 63606
    },
    {
        "country": "Spain",
        "year": "2003",
        "unit": "GWh",
        "solar": 41,
        "hydro": 43897,
        "wind": 12075,
        "nuclear": 61875
    },
    {
        "country": "Spain",
        "year": "2002",
        "unit": "GWh",
        "solar": 30,
        "hydro": 26270,
        "wind": 9342,
        "nuclear": 63016
    },
    {
        "country": "Spain",
        "year": "2001",
        "unit": "GWh",
        "solar": 24,
        "hydro": 43864,
        "wind": 6759,
        "nuclear": 63708
    },
    {
        "country": "Spain",
        "year": "2000",
        "unit": "GWh",
        "solar": 18,
        "hydro": 31807,
        "wind": 4727,
        "nuclear": 62206
    }
];

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
        let options =
            {
                theme: "bootstrap",
                title: {
                    text: "Backlog",
                    font: this.titleFont
                },
                legend: {
                    position: "bottom"
                },
                series: [
                    {
                        type: "area",
                        markers:
                        {
                            visible: true,
                            size: 6
                        },
                        field: "solar",
                        categoryField: "year"
                    },
                    {
                        type: "area",
                        markers:
                        {
                            visible: true,
                            size: 6
                        },
                        field: "hydro",
                        categoryField: "year"
                    },
                    {
                        type: "area",
                        markers:
                        {
                            visible: true,
                            size: 6
                        },
                        field: "wind",
                        categoryField: "year"
                    },
                    {
                        type: "area",
                        markers:
                        {
                            visible: true,
                            size: 6
                        },
                        field: "nuclear",
                        categoryField: "year"
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
                        baseUnit: "years",
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
                dataSource: new kendo.data.DataSource(
                    {
                        data: spainElectricity
                    }),

                render: (e: kendo.dataviz.ui.ChartRenderEvent) => this.showProgress(false)
            } as kendo.dataviz.ui.ChartOptions;

        return options;
    }
}