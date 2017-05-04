import {Injectable} from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect } from "@ngrx/effects";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/observable/from";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";

import * as identity from "./Identity";
import { AppSettings } from "../Services";
import { AppState } from "../Store";

@Injectable()
export class IdentityEffects
{
    constructor(protected actions$: Actions, 
                protected appSettings: AppSettings,
                protected state$: Store<AppState>) {}
    
    /**
     * Authorizes an existing token in the Identity state to ensure that it is still valid
     */
    @Effect() authorize$ = this.actions$
        .ofType(identity.AUTHORIZE)
        .withLatestFrom(this.state$.select(identity.key) as Observable<identity.State>)
        .switchMap((value: [Action, identity.State]) =>
        {           
            if(value[1].token === undefined)
                return this.authorizeError("Token is invalid");
            
            if(value[1].loggedIn && value[1].name !== undefined && value[1].roleLevel !== undefined)
                // Authorization not necessary
                return this.authorizeFulfilled(value[1], {name: value[1].name, token: value[1].token, roleLevel: value[1].roleLevel});

            return Observable.ajax.getJSON(`${this.appSettings.gatewayServiceUrl}Account/GetUserFromIdentity?Identity=${value[1].token}`)
                .switchMap((rawResponse: Object) =>
                {
                    const response = TypedJSON.parse(TypedJSON.stringify(rawResponse), GetUserResponse);
                    if(response.success)
                    {
                        if(response.data.roleLevel < this.appSettings.minimumRoleLevel)
                            return this.authorizeError("Minimum role level requirement not met");
                            
                        return this.authorizeFulfilled(value[1], {name: response.data.name, token: response.data.identity, roleLevel: response.data.roleLevel});
                    }

                    return Observable.from([{ type: identity.AUTHORIZE_ERROR, payload: new Error(response.message) as Object }]);
                })
                .catch((err: any) => this.authorizeError(err));
        });

    /**
     * Authenticates a user name and password, setting Identity state information if it is valid
     */
    @Effect() authenticate$ = this.actions$
        .ofType(identity.AUTHENTICATE)
        .switchMap((value: Action) =>
        {           
            const payload = value.payload as identity.AuthenticatePayload;

            if(payload.name === undefined || payload.name.length === 0 || payload.password === undefined || payload.password.length === 0 )
                return this.authenticateError("Name or password is invalid");

            return Observable.ajax.getJSON(`${this.appSettings.gatewayServiceUrl}Account/GetUserFromLogin?Name=${value.payload["name"]}&Password=${value.payload["password"]}`)
                .switchMap((rawResponse: Object) =>
                {
                    const response = TypedJSON.parse(TypedJSON.stringify(rawResponse), GetUserResponse);
                    if(response.success)
                    {
                        if(response.data.roleLevel < this.appSettings.minimumRoleLevel)
                            return this.authenticateError("Minimum role level requirement not met");
                        
                        return this.authenticateFulfilled(payload, {name: response.data.name, token: response.data.identity, roleLevel: response.data.roleLevel});
                    }

                    return this.authenticateError(response.message);
                })
                .catch((err: any) => this.authenticateError(err));
        });
    
    @Effect({dispatch: false}) logout = this.actions$
        .ofType(identity.REVOKE)
        .do(() =>
        {
            console.log("logout effect");
            localStorage.removeItem(identity.lsName);
            localStorage.removeItem(identity.lsToken);
        });

    private authorizeFulfilled(state: identity.State, response: identity.LoginFulfilledPayload): Observable<Action>
    {
        if(state.stayLoggedIn)
        {
            localStorage[identity.lsName] = response.name;
            localStorage[identity.lsToken] = response.token;
        }
        else
        {
            localStorage.removeItem(identity.lsName);
            localStorage.removeItem(identity.lsToken);
        }

        return Observable.from([{ type: identity.AUTHORIZE_FULFILLED, payload: response}]);
    }

    private authorizeError(error: any): Observable<Action>
    {
        localStorage.removeItem(identity.lsName);
        localStorage.removeItem(identity.lsToken);

        return Observable.from([{ type: identity.AUTHORIZE_ERROR, payload: new Error(error)}]);
    }

    private authenticateFulfilled(payload: identity.AuthenticatePayload, response: identity.LoginFulfilledPayload): Observable<Action>
    {
        if(payload.stayLoggedIn)
        {
            localStorage[identity.lsName] = response.token;
            localStorage[identity.lsToken] = response.token;
            localStorage[identity.lsStayLoggedIn] = true;
        }
        else
        {
            localStorage.removeItem(identity.lsName);
            localStorage.removeItem(identity.lsToken);
            localStorage[identity.lsStayLoggedIn] = false;
        }

        return Observable.from([{ type: identity.AUTHENTICATE_FULFILLED, payload: response}]);
    }

    private authenticateError(error: any): Observable<Action>
    {
        localStorage.removeItem(identity.lsName);
        localStorage.removeItem(identity.lsToken);

        return Observable.from([{ type: identity.AUTHENTICATE_ERROR, payload: new Error(error)}]);
    }
}


@JsonObject
class LoginUser
{
    @JsonMember({name: "Id"})
    id: number;

    @JsonMember({name: "Identity"})
    identity: string;

    @JsonMember({name: "Name"})
    name: string;

    @JsonMember({name: "RoleId"})
    roleId: number;

    @JsonMember({name: "RoleName"})
    roleName: string;

    @JsonMember({name: "RoleLevel"})
    roleLevel: number;

    @JsonMember({name: "CanChangePassword"})
    canChangePassword: boolean;

    @JsonMember({name: "MustChangePassword"})
    mustChangePassword: boolean;

    @JsonMember({name: "Disabled"})
    disabled: boolean;

    @JsonMember({name: "LastLogin"})
    lastLogin: Date;

    // TODO:
    // customers: Map<int, string>;
}

@JsonObject
class GetUserResponse
{
    @JsonMember
    success: boolean;

    @JsonMember
    message: string;

    @JsonMember
    data: LoginUser;
}

