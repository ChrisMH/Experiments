import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Action, State, StateContext } from '@ngxs/store';
import { filter } from 'rxjs/operators';

class Navigated {
    static readonly type = '[router] Navigated';
    constructor(public url: string) {}
}

@State<string>({
    name: 'router',
    defaults: ''
})
export class RouterState {
    constructor(
        protected router: Router
    ) {
    }

    onInit(state: StateContext<string>): void {
        this.router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationEnd)
        ).subscribe((event: RouterEvent) => {
            state.dispatch(new Navigated(event.url));
            // state.setState(event.url);
        });
    }

    @Action(Navigated)
    navigated({setState}: StateContext<string>, {url}: Navigated) {
        setState(url);
    }
}
