 
/*
import { getStore, State1Actions, State2Actions } from "./basic";


let store = getStore();




console.dir(store.getState());
store.dispatch({ type: State1Actions.INC });
store.dispatch({ type: State1Actions.INC });
store.dispatch({ type: State1Actions.DEC });
store.dispatch({ type: State1Actions.DEC });
store.dispatch({ type: State1Actions.INC });
store.dispatch({ type: "WRONG" });
store.dispatch({ type: State2Actions.PUSH });
store.dispatch({ type: State2Actions.PUSH });
store.dispatch({ type: State2Actions.PUSH });
store.dispatch({ type: State2Actions.PUSH });
store.dispatch({ type: State2Actions.PUSH });
store.dispatch({ type: State2Actions.POP });
store.dispatch({ type: State2Actions.POP });
store.dispatch({ type: State2Actions.POP });
store.dispatch({ type: State2Actions.POP });
store.dispatch({ type: State2Actions.PUSH });
store.dispatch({ type: State2Actions.PUSH });
store.dispatch({ type: State2Actions.POP });
store.dispatch({ type: State2Actions.POP });
store.dispatch({ type: State2Actions.POP });
store.dispatch({ type: State2Actions.POP });
store.dispatch({ type: "WRONG" });

*/

/*
import { getStore, getBacklogAction } from "./observable";

let store = getStore();

store.subscribe(() => 
{
    console.dir(store.getState());
});

store.dispatch(getBacklogAction());
*/



import { getStore, getBacklog } from "./reduxObservable";

let store = getStore();

store.dispatch(getBacklog());
