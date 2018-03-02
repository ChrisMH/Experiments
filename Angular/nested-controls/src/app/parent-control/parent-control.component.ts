import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Company } from '../models';

@Component({
    selector: 'app-parent-control',
    templateUrl: './parent-control.component.html',
    styleUrls: ['./parent-control.component.styl']
})
export class ParentControlComponent implements OnInit, OnChanges {

    companies: Company[] = [];

    constructor() { }

    ngOnInit() {
        setTimeout(() => this.createCompanies(), 1000);

        // setTimeout(() => console.dir(this.companies), 6000);
    }

    ngOnChanges(changes: SimpleChanges) {
        console.dir(changes);
    }

    protected createCompanies() {
        // const newCompanies: Company[] = [];
        this.companies.push({id: 100, displayName: 'Company 100'});
        this.companies.push({id: 50, displayName: 'Company 50'});
        this.companies.push({id: 106, displayName: 'Company 106'});
        this.companies.push({id: 1, displayName: 'Company 1'});
        // this.companies = newCompanies;
    }

    private id = 51;
    onAdd() {
        this.companies.push({id: this.id, displayName: `Company ${this.id}`});
        this.id++;
    }
}
