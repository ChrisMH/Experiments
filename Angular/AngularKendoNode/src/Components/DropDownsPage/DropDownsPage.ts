import { Component } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "drop-downs-page",
    templateUrl: "./DropDownsPage.html",
    //styleUrls: ["./DatePickerPage.css"],
    host: { class: "view" }
})

export class DropDownsPage
{    
    dropDownItems =  [
        { id: 1, name: "First Value"},
        { id: 2, name: "Second Value"},
        { id: 3, name: "Third Value"},
        { id: 4, name: "Fourth Value"}
    ];
    dropDownValue = 2;
}