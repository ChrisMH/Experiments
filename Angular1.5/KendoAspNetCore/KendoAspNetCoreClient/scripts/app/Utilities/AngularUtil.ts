import * as angular from "angular";

export namespace AngularUtil
{
    export class Directive implements angular.IDirective
    {
        public restrict: string;
        public replace = true;

        public template = require("./AreaChart.html");
        public controller = "AreaChart";
        public controllerAs = "ctrlAreaChart";
        public scope: boolean | { [boundProperty: string]: string } = {};
        public bindToController: boolean | { [boundProperty: string]: string } = {};

        constructor()
        {
            this.restrict = "E";
        }
        public restrict = "E";
        public replace = true;

        public template = require("./AreaChart.html");
        public controller = "AreaChart";
        public controllerAs = "ctrlAreaChart";
        public scope: boolean | { [boundProperty: string]: string } = {};
        public bindToController: boolean | { [boundProperty: string]: string } = {};

        static factory(): angular.IDirectiveFactory
        {
            return () => new Directive();
        }
    }

    export function createDirective(): angular.IDirective
    {
        return {
            restrict: "E",
            replace: true,

            template: require("./AreaChart.html"),
            controller = "AreaChart";
            controllerAs = "ctrlAreaChart";
            scope: boolean | { [boundProperty: string]: string } = {};
            bindToController: boolean | { [boundProperty: string]: string } = {};

            static factory(): angular.IDirectiveFactory
            {
                return () => new AreaChartDirective();
            }
    } as angular.IDirective;
    }

}