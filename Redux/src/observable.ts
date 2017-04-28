import { Action, applyMiddleware, createStore, combineReducers, Dispatch, Reducer, Store } from "redux";
import logger from "redux-logger";
import thunk, { ThunkAction } from "redux-thunk";

import { AjaxResponse, Observable, Subscriber } from "rxjs";

const GET_BACKLOG = "GET_BACKLOG";
const GET_BACKLOG_FULFILLED = "GET_BACKLOG_FULFILLED";
const GET_BACKLOG_ERROR = "GET_BACKLOG_ERROR";

interface BacklogAction extends Action
{ 
    payload: any
}

const getBacklog: () => BacklogAction = () => ({type: GET_BACKLOG, payload: undefined});
const getBacklogFulfilled: (payload: any) => BacklogAction = (payload: any) =>  ({type: GET_BACKLOG_FULFILLED, payload: payload});
const getBacklogError: (error: any) => BacklogAction = (error: any) =>  ({type: GET_BACKLOG_FULFILLED, payload: error});


interface BacklogState
{
    fetching: boolean;
    fetched: boolean;
    error: boolean;
    backlog: Array<Object>
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
        case GET_BACKLOG:
            return Object.assign({}, initialBacklogState, { fetching: true });

        case GET_BACKLOG_FULFILLED:
            return Object.assign({}, initialBacklogState, { fetched: true, backlog: action.payload });

        case GET_BACKLOG_ERROR:
            return Object.assign({}, initialBacklogState, { fetched: true, error: true });

        default: 
            return state;
    } 
}

const getBacklogAction = (): ThunkAction<void, BacklogState, any> =>
{
    return (dispatch: Dispatch<BacklogState>): void =>
    {
        dispatch(getBacklog);

        Observable.ajax.get("http://localhost/OverviewHealthService/backlog")
            .subscribe((value: AjaxResponse) =>
            {
                let backlog = value.response.data;
                dispatch(getBacklogFulfilled(backlog));
            },
            (error: any) =>
            {                
                dispatch(getBacklogError(error));
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
