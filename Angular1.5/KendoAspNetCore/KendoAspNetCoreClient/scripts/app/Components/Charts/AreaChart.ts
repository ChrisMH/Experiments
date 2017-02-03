import * as angular from "angular";

import "./AreaChart.css";

export class AreaChartDirective implements angular.IDirective
{
    public restrict = "E";
    public replace = true;

    public template = require("./AreaChart.html");
    public controller = "AreaChart";
    public controllerAs = "ctrlAreaChart";
    public scope: boolean | { [boundProperty: string]: string } = {};
    public bindToController: boolean | { [boundProperty: string]: string } = {};

    static factory(): angular.IDirectiveFactory
    {
        return () => new AreaChartDirective();
    }
}

export class AreaChart
{
    
}