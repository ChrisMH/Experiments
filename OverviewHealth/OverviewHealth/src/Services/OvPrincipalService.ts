import { Injectable } from "@angular/core";
import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";
import * as Rx from "rxjs";

import { AppSettings } from "../Services";

export class Identity
{
    constructor(public name: string, public token: string, public roleLevel: number) {}
}

@Injectable()
export class OvPrincipalService
{
    private identity: Identity = null;

    static $inject = ["$http", "$q", "appSettings"];

    constructor(protected appSettings: AppSettings) { }

    isAuthenticated(): boolean
    {
        return this.identity !== undefined;
    }

    getUserName(): string
    {
        return this.identity ? this.identity.name : "";
    }

    getIdentityToken(): string
    {
        return this.identity ? this.identity.token : "";
    }

    /**
     * Revoke any existing authentication
     * @returns {void} 
     */
    revoke(): void
    {
        this.identity = null;
    }


    /**
     * Authenticates a user with a given name and password
     *
     * @param name {string} the user name
     * @param password {string} the password
     * @returns {Observable<Identity>} An observable that resolve 
     */
    authenticate(name: string, password: string): Rx.Observable<Identity>
    {
        return Rx.Observable.create((obs: Rx.Subscriber<Identity>) =>
        {
            this.identity = undefined;

            if (!this.appSettings.requireAuthentication)
            {
                this.identity = new Identity("DEVELOPMENT", "00000000-0000-0000-0000-000000000000", this.appSettings.minimumRoleLevel);
                obs.next(this.identity);
                obs.complete();
                return;
            }

            if (name === undefined || password === undefined || name.length === 0 || password.length === 0)
            {
                obs.error(new Error("name or password not supplied"));
                obs.complete();
                return;
            }

            Rx.Observable.ajax.getJSON(`${this.appSettings.gatewayServiceUrl}Account/GetUserFromLogin?Name=${name}&Password=${password}`)
                .map((value: Object) =>
                {
                    const response = TypedJSON.parse(TypedJSON.stringify(value), GetUserResponse);
                    if(response.success)
                        return new Identity(response.data.name, response.data.identity, response.data.roleLevel);
                    throw new Error(response.message);
                })
                .subscribe((value: Identity) => 
                {
                    this.identity = value;
                    obs.next(value)
                },
                (err: any) => obs.error(err),
                () => obs.complete);
        });
    }



    /**
    * Authorizes an existing identity token
    *
    * @param token {string} The token to authorize
    * @returns {Observable<Identity>} An observable that will resolve to an identity if the token is valid
    */
    authorize(token: string): Rx.Observable<Identity>
    {

        return Rx.Observable.create((obs: Rx.Subscriber<Identity>) =>
        {
            this.identity = undefined;

            if (!this.appSettings.requireAuthentication)
            {
                this.identity = new Identity("DEVELOPMENT", "00000000-0000-0000-0000-000000000000", this.appSettings.minimumRoleLevel);
                obs.next(this.identity);
                obs.complete();
                return;
            }

            if (token === undefined || token.length === 0)
            {
                obs.error(new Error("token not supplied"));
                obs.complete();
                return;
            }

            Rx.Observable.ajax.getJSON(`${this.appSettings.gatewayServiceUrl}Account/GetUserFromIdentity`)
                .map((value: Object) =>
                {
                    const response = TypedJSON.parse(TypedJSON.stringify(value), GetUserResponse);
                    if(response.success)
                        return new Identity(response.data.name, response.data.identity, response.data.roleLevel);
                    throw new Error(response.message);
                })
                .subscribe((value: Identity) => 
                {
                    this.identity = value;
                    obs.next(value)
                },
                (err: any) => obs.error(err),
                () => obs.complete);
        });
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
