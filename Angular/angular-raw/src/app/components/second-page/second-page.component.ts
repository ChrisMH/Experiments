import { Component, HostBinding } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-second-page',
    templateUrl: './second-page.component.html',
    styleUrls: ['./second-page.component.styl']
})

export class SecondPageComponent {
    @HostBinding('class') hostClass = 'view';

    protected loadTime: Date;

    constructor() {
        this.loadTime = moment().toDate();
    }
}
