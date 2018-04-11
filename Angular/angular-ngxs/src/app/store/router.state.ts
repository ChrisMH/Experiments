import { ActivatedRoute, Router } from '@angular/router';
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

    }
}
