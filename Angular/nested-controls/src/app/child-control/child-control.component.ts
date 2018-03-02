import { Component, EventEmitter, Input, IterableChangeRecord, IterableDiffer,
    OnChanges, OnInit, DoCheck, Output, SimpleChanges, IterableDiffers } from '@angular/core';

import { Company } from '../models';

@Component({
    selector: 'app-child-control',
    templateUrl: './child-control.component.html',
    styleUrls: ['./child-control.component.styl']
})
export class ChildControlComponent implements OnInit, OnChanges, DoCheck {
    @Input() companies: Company[] = [];

    //private _companies: Company[] = [];

    // @Input() set companies(companies: Company[]) {
    //     this._companies = companies;
    //     // if (this._companies.length > 0) {
    //     //     setTimeout(() => this.sortCompanies(), 1000);
    //     // }
    // }
    // @Output() companiesChange = new EventEmitter<Company[]>();
    private companiesDiffer: IterableDiffer<Company>;

    constructor(protected iterDiffer: IterableDiffers) {
        this.companiesDiffer = this.iterDiffer.find(this.companies).create(null);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('companies' in changes) {
            console.log('Child : ngOnChanges : companies changed');
            this.companiesDiffer = this.iterDiffer.find(this.companies).create(null);
            setTimeout(() => this.sortCompanies());
        }
    }

    ngDoCheck(): void {
        const changes = this.companiesDiffer.diff(this.companies);

        if (changes) {
            console.log('Child : ngDoCheck : changes');
            changes.forEachAddedItem((i: IterableChangeRecord<Company>) =>
                console.log(`  added: id=${i.item.id}, displayName=${i.item.displayName}`));
            changes.forEachIdentityChange((i: IterableChangeRecord<Company>) =>
                console.log(`  identity: id=${i.item.id}, displayName=${i.item.displayName}`));
            changes.forEachMovedItem((i: IterableChangeRecord<Company>) =>
                console.log(`  moved: id=${i.item.id}, displayName=${i.item.displayName}`));
            changes.forEachRemovedItem((i: IterableChangeRecord<Company>) =>
                console.log(`  removed: id=${i.item.id}, displayName=${i.item.displayName}`));
            setTimeout(() => this.sortCompanies());
        }
        else {
            console.log('Child : ngDoCheck : no changes');
        }
    }

    protected sortCompanies() {
        console.log('sortCompanies');
        this.companies.sort((a: Company, b: Company) => {
            if (a.id < b.id) {
                return -1;
            }
            else if (a.id > b.id) {
                return 1;
            }
            return 0;
        });
        // this.companiesChange.emit(this._companies);
        // setTimeout(() => this.addCompany(), 1000);
    }

    private id = 2;
    onAdd() {
        this.companies.push({id: this.id, displayName: `Company ${this.id}`});
        this.id++;
    }

    onClear() {
        this.companies.splice(0);
    }
}
