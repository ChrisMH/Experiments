﻿import * as angular from "angular";
import "kendo";
import * as moment from "moment";

import "./Charts.css";

import { AppSettings } from "../../Services";

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

export class Charts implements angular.IController
{
    static $inject = ["$scope", "appSettings"];

    protected electricity: kendo.data.DataSource;

    constructor(protected $scope: angular.IScope, protected appSettings: AppSettings)
    {
        this.electricity = new kendo.data.DataSource({
            data: spainElectricity
        });
    }

    $onInit()
    {
    }
}
