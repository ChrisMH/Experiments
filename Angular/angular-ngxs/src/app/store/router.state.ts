import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Action, State, StateContext } from '@ngxs/store';

@State<string>({
    name: 'router',
    defaults: ''
})
export class RouterState {
    constructor(
        protected activatedRoute: ActivatedRoute,
        protected router: Router
    ) {
        this.activatedRoute.url.subscribe((seg: UrlSegment[]) => {console.log(`ar`); console.dir(seg); });
    }

    onInit(state: StateContext<string>): void {

        console.log(`onInit: route=${this.activatedRoute.snapshot.url}`);
    }
}
