import { Action, applyMiddleware, createStore, combineReducers, Dispatch, Reducer, Store } from "redux";
import logger from "redux-logger";
import thunk, { ThunkAction } from "redux-thunk";

import { AjaxResponse, Observable, Subscriber } from "rxjs";



enum BacklogActions
{
    GET_BACKLOG,
    GET_BACKLOG_FULFILLED,
    GET_BACKLOG_ERROR
}

interface BacklogState
{
    fetching: boolean;
    fetched: boolean;
    error: boolean;
    backlog: Array<Object>
}

interface BacklogAction extends Action
{
    backlog: Array<object>
}

const initialBacklogState = {
    fetching: false,
    fetched: false,
    error: false,
    backlog: new Array<Object>()
};

const backlogReducer: Reducer<BacklogState> = (state: BacklogState = initialBacklogState, action: BacklogAction): BacklogState =>
{
    switch(action.type)
    {
        case BacklogActions.GET_BACKLOG:
            return Object.assign({}, initialBacklogState, { fetching: true });

        case BacklogActions.GET_BACKLOG_FULFILLED:
            return Object.assign({}, initialBacklogState, { fetched: true, backlog: action.backlog });

        case BacklogActions.GET_BACKLOG_ERROR:
            return Object.assign({}, initialBacklogState, { fetched: true, error: true });

        default: 
            return state;
    } 
}

const getBacklogAction = (): ThunkAction<void, BacklogState, any> =>
{
    return (dispatch: Dispatch<BacklogState>): void =>
    {
        dispatch({ type: BacklogActions.GET_BACKLOG});

        Observable.ajax.get("http://localhost/OverviewHealthService/backlog")
            .subscribe((value: AjaxResponse) =>
            {
                let backlog = value.response.data;
                dispatch({type: BacklogActions.GET_BACKLOG_FULFILLED, backlog: backlog});
            },
            (error: any) =>
            {                
                dispatch({type: BacklogActions.GET_BACKLOG_ERROR});
            });            
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
        let middleware = applyMiddleware(logger, thunk);
        store = createStore(backlogReducer, middleware);
    }
    return store;
}

export { getBacklogAction, getStore };




/*
store.subscribe(() =>
{
    console.dir(store.getState());
});


console.dir(store.getState());
store.dispatch(getBacklogAction());
*/
