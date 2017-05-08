import { Component, Input } from "@angular/core";

@Component({
    selector: "loading-indicator",
    templateUrl: "LoadingIndicator.html",
    styleUrls: ["LoadingIndicator.styl"]
})

export class LoadingIndicator
{
    @Input() loading = false;
}