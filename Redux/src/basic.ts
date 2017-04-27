import { applyMiddleware, createStore, combineReducers, Action, Reducer, Store } from "redux";
import logger from "redux-logger";

//
// State 1
//

enum State1Actions
{
    INC,
    DEC
}

interface State1
{
    count: number;
}

const initialState1 = { count: 0 };

const reducer1: Reducer<State1> = (state: State1 = initialState1, a: Action): State1 =>
{
    switch(a.type)
    {
        case State1Actions.INC:
            return {...state, count: state.count + 1};
        case State1Actions.DEC:
            return {...state, count: state.count - 1};
        default:
            return state;
    }
};

//
// State 2
//

enum State2Actions
{
    PUSH,
    POP
}

interface State2
{
    values: number[];
}

const initialState2 = { values: new Array<number>() };
let counter = 0;

let reducer2: Reducer<State2> = (state: State2 = initialState2, a: Action): State2 =>
{
    switch(a.type)
    {
        case State2Actions.PUSH:
        {
            let newState = {...state};
            newState.values = state.values.concat(counter++); // BAD, but just for an example
            return newState;
        }
        case State2Actions.POP:
        {
            let newState = {...state};
            if(state.values.length > 0)
                newState.values = state.values.slice(0, state.values.length - 1);
            return newState;
        }

        default:
            return state;
    }
};


//
// Store
//
let store: Store<{}>;

const getStore = (): Store<{}> =>
{
    if(store === undefined)
    {
        let middleware = applyMiddleware(logger);
        store = createStore(combineReducers({ r1: reducer1, r2: reducer2}), middleware);
    }
    return store;
}

export { State1Actions, State2Actions, getStore };

/*
store.subscribe(() =>
{
    console.dir(store.getState());
});

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
