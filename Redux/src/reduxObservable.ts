import { Action, applyMiddleware, createStore, combineReducers, Dispatch, Reducer, Store } from "redux";
import { ActionsObservable, combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import logger from "redux-logger";

import * as Rx from "rxjs";

const GET_BACKLOG = "GET_BACKLOG";
const GET_BACKLOG_FULFILLED = "GET_BACKLOG_FULFILLED";
const GET_BACKLOG_ERROR = "GET_BACKLOG_ERROR";

interface BacklogAction extends Action
{ 
    payload: any
}  

const getBacklog: () => BacklogAction = () => ({type: GET_BACKLOG, payload: undefined});
const getBacklogFulfilled: (payload: Array<Object>) => BacklogAction = (payload: any) =>  ({type: GET_BACKLOG_FULFILLED, payload: payload});
const getBacklogError: (error: any) => BacklogAction = (error: any) =>  ({type: GET_BACKLOG_ERROR, payload: error});

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
  

const backlogEpic: Epic<BacklogAction, BacklogState>  = (action$: ActionsObservable<BacklogAction>) =>
{
    return action$.ofType(GET_BACKLOG)
        .mergeMap((action: BacklogAction) =>
        {
            return Rx.Observable.ajax.getJSON("http://localhost/OverviewHealthService/backlog")
                .map((json: any) => getBacklogFulfilled(json))
                .catch((err: Rx.AjaxError) => Rx.Observable.of(getBacklogError(`${err.xhr.status} ${err.xhr.statusText}`)));
        });        
};

//
// Store
//
let store: Store<{}>;

const getStore = (): Store<{}> =>
{
    if(store === undefined)
    {
        let epicMiddleware = createEpicMiddleware(combineEpics(backlogEpic));
        let middleware = applyMiddleware(logger, epicMiddleware);
        store = createStore(backlogReducer, middleware);
    }
    return store;
}

export { getBacklog, getStore };

/*
store.subscribe(() =>
{
    console.dir(store.getState());
});


console.dir(store.getState());
store.dispatch(getBacklog());
*/
