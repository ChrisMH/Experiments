import { Component, HostBinding } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-first-page',
    templateUrl: 'first-page.component.html',
    styleUrls: ['first-page.component.styl']
})

export class FirstPageComponent {
    @HostBinding('class') hostClass = 'view';

    protected loadTime: Date;

    constructor() {
        this.loadTime = moment().toDate();
    }
}
