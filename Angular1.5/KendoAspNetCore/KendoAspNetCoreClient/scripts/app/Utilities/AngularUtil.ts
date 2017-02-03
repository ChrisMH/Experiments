import * as angular from "angular";

export namespace AngularUtil
{
    export class Directive implements angular.IDirective
    {
        public restrict: string;
        public replace: boolean;
        public template: string | ((tElement: JQuery, tAttrs: angular.IAttributes) => string);
        public controller: string | angular.Injectable<angular.IControllerConstructor>;
        public controllerAs: string;
        public scope: boolean | { [boundProperty: string]: string } = {};
        public bindToController: boolean | { [boundProperty: string]: string } = {};

        constructor(controllerName: string, bindToController?: { [boundProperty: string]: string }, template?: string)
        {
            this.restrict = "E";
            this.replace = true;
            this.template = template ? template : require(`./${controllerName}.html`);
            this.controller = controllerName;
            this.controllerAs = `ctrl${controllerName}`;
            this.scope = {};
            this.bindToController = bindToController ? bindToController : {};
        }
    }
}