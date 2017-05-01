import { Action, Reducer } from "@ngrx/store";

export interface Identity
{
    name: string;
    token: string;
}


const AUTHENTICATE = "AUTHENTICATE";
const AUTHORIZE = "AUTHORIZE";
const REVOKE = "REVOKE";

const initialValue: Identity = { name: undefined, token: undefined };

export const authenticate = (name: string, password: string): Action =>
{
    return { type: AUTHENTICATE, payload: {name: name, password: password}} as Action;
}

export const authorize = (token: string): Action =>
{
    return { type: AUTHORIZE, payload: {token: token}} as Action;
}

export const revoke = (): Action =>
{
    return { type: REVOKE } as Action;
}


export const principalReducer = (state: Identity = initialValue, action: Action): Identity =>
{
    switch(action.type)
    {
        case AUTHENTICATE:
            return {...state} as Identity;

        case AUTHORIZE:
            return {...state} as Identity;
            
        case REVOKE:
            return {...state} as Identity;

        default:
            return state;
    }
}
