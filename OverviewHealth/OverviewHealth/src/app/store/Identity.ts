import { Action, ActionReducer, Reducer, Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/first";
 
import { AppState } from "./AppState";

export const key = "identity";

export interface State
{
    name: string;
    token: string;
    roleLevel: number;
    stayLoggedIn: boolean;

    loggingIn: boolean;
    loggedIn: boolean;
}

export const getState = (store: Store<AppState>): State =>
{
    let state: State;
    store.select(key).first().subscribe((s: State) => state = s);
    return state;
}

export const lsName = "identityName";
export const lsToken = "identityToken";
export const lsStayLoggedIn = "identityStayLoggedIn";

export const AUTHENTICATE = "AUTHENTICATE";
export const AUTHENTICATE_FULFILLED = "AUTHENTICATE_FULFILLED";
export const AUTHENTICATE_ERROR = "AUTHENTICATE_ERROR";
export const AUTHORIZE = "AUTHORIZE";
export const AUTHORIZE_FULFILLED = "AUTHORIZE_FULFILLED";
export const AUTHORIZE_ERROR = "AUTHORIZE_ERROR";
export const REVOKE = "REVOKE";

const initialValue: State = 
{ 
    name: localStorage.getItem(lsName) || undefined,
    token: localStorage.getItem(lsToken) || undefined,
    roleLevel: undefined,
    stayLoggedIn: localStorage.getItem(lsStayLoggedIn) === "true",

    loggingIn: false,
    loggedIn: false
};

/**
 * Authorize against the identity token in the current state
 */
export const authorize = (): Action =>
{
    return { type: AUTHORIZE } as Action;
}

/**
 * Authenticate the supplied user
 * 
 * @param name user name
 * @param password password
 * @param stayLoggedIn if true, authenticated information will be kept in local storage
 */
export const authenticate = (name: string, password: string, stayLoggedIn: boolean): Action =>
{
    return { type: AUTHENTICATE, payload: {name: name, password: password, stayLoggedIn: stayLoggedIn}} as Action;
}

/**
 * Revoke authentication
 * 
 */
export const revoke = (): Action =>
{
    return { type: REVOKE } as Action;
}

export interface AuthenticatePayload
{ 
    name: string;
    password: string;
    stayLoggedIn: boolean;
}

export interface LoginFulfilledPayload
{
    name: string;
    token: string;
    roleLevel: number;
}

export const reducer: ActionReducer<State> = (state: State = initialValue, action: Action): State =>
{
    switch(action.type)
    {
        case AUTHORIZE:
            //console.log(`identity.reducer: ${action.type}`);
            return Object.assign({}, state, {loggingIn: true});
            
        case AUTHENTICATE:
        {
            const payload = action.payload as AuthenticatePayload;
            //console.log(`identity.reducer: ${action.type}, name=${payload.name}, password=${payload.password}, stayLoggedIn=${payload.stayLoggedIn}`);
            return Object.assign({}, state, {token: undefined, roleLevel: undefined, stayLoggedIn: payload.stayLoggedIn, loggingIn: true, loggedIn: false});
        }
        case AUTHORIZE_FULFILLED:
        case AUTHENTICATE_FULFILLED:
        {
            const payload = action.payload as LoginFulfilledPayload;
            //console.log(`identity.reducer: ${action.type}: name=${payload.name}, token=${payload.token}`);
            return Object.assign({}, state, {name: payload.name, token: payload.token, roleLevel: payload.roleLevel, loggingIn: false, loggedIn: true});
        }
        case AUTHORIZE_ERROR:
        case AUTHENTICATE_ERROR:
            //console.log(`identity.reducer: ${action.type}: error=${action.payload}`);
            return Object.assign({}, state, {token: undefined, roleLevel: undefined, loggingIn: false, loggedIn: false});

        case REVOKE:
            //console.log(`identity.reducer: ${action.type}`);
            return Object.assign({}, state, {token: undefined, roleLevel: undefined, loggingIn: false, loggedIn: false});

        default:
            return state;
    }
}

