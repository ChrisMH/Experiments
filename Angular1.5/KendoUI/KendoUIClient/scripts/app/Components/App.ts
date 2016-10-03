import { AppSettings } from "../Services/AppSettings";
import moment from "moment";


export class AppDirective implements ng.IDirective {
    public restrict: string = "E";
    public replace: boolean = true;
    public templateUrl: string = "scripts/app/Components/App.html";
    public controller: string = "App";
    public controllerAs: string = "Ctrl";
    public scope = {};

    constructor(private $templateCache: ng.ITemplateCacheService) {
        //this.template = $templateCache.get<string>("scripts/app/Components/App.html")
    }

    static Factory(): ng.IDirectiveFactory {
        var directive = ($templateCache: ng.ITemplateCacheService) => new AppDirective($templateCache);
        directive.$inject = ["$templateCache"];
        return directive;
    }
}


export interface IAppScope extends ng.IScope
{
    datePickerOptions: kendo.ui.DatePickerOptions;
    grid1Options: kendo.ui.GridOptions;
    grid2Options: kendo.ui.GridOptions;

    startDate: Date;
    endDate: Date;

}

export class App implements ng.IController
{
    static $inject = ["$scope", "appSettings"];

    constructor(private $scope: IAppScope, private appSettings: AppSettings)
    {
        this.$scope.datePickerOptions = this.createDatePickerOptions();
        this.$scope.grid1Options = this.createGrid1Options();
        this.$scope.grid2Options = this.createGrid2Options();

        this.$scope.startDate = moment().subtract(1, "year").toDate();
        this.$scope.endDate = moment().toDate();


    }
        
    $onInit()
    {
        console.log("App.init:")
        console.log("  originUrl=" + this.appSettings.pageConfig.originUrl);
        console.log("  rootUrl=" + this.appSettings.pageConfig.rootUrl);
        console.log("  version=" + this.appSettings.pageConfig.version);
    }

    private createDatePickerOptions(): kendo.ui.DatePickerOptions
    {
        let options: kendo.ui.DatePickerOptions = {
            min: moment("01/01/1900").toDate(),
            max: moment("12/31/2100").toDate(),
            format: "MM/dd/yyyy"
        };
        return options;
    }

    private createGrid1Options(): kendo.ui.GridOptions
    {
        let options: kendo.ui.GridOptions = {
            columns: [
                <kendo.ui.GridColumn>{ field: "f1", title: "Assignee Name", width: "*" }
            ]
        }
        return options;
    }

    private createGrid2Options(): kendo.ui.GridOptions
    {
        let options: kendo.ui.GridOptions = {
            columns: [
                <kendo.ui.GridColumn>{ field: "assigneeName", title: "Assignee Name", width: "*" },
                <kendo.ui.GridColumn>{ field: "grants", title: "Grants", width: 100 },
                <kendo.ui.GridColumn>{ field: "publications", title: "Publications", width: 100 },
                <kendo.ui.GridColumn>{ field: "totalActivity", title: "Total Activity", width: 100 }
            ]
        }
        return options;
    }
}


class GridOptions implements kendo.ui.GridOptions
{
    public columns: GridColumn[];
}

class GridColumn implements kendo.ui.GridColumn
{
    public field: string;
    public title: string;
    public width: string | number;
}