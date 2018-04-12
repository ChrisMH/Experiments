import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';

import { RouterState } from './store/router.state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent {
    title = 'app';

    @Select(RouterState) url$: Observable<string>;

    constructor() {
        this.url$.subscribe((url: string) => console.log(`url=${url}`));
    }
}
