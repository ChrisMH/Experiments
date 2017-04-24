import { JsonObject, JsonMember, TypedJSON } from "typedjson-npm";
import * as Rx from "rxjs";

import { IServiceResponse } from "../Models";
import { AppSettings } from "../Services";


export class PrincipalService
{
    private identity: Identity = null;
    private appSettings = AppSettings.Load();

    private static principalService: PrincipalService;
    static Load(): PrincipalService
    {
        if(!PrincipalService.principalService)
            PrincipalService.principalService = new PrincipalService();
        return PrincipalService.principalService;
    }
    
    private constructor() {}

    isAuthenticated(): boolean
    {
        return this.identity !== null && this.identity !== undefined;
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
     * Retrieves the promise of a new identity token based on user information.
     *
     * @param name {string} the user name
     * @param password {string} the password
     * @returns {Rx.Observable<Identity>} 
     */
    authenticate(name: string, password: string): Rx.Observable<Identity>
    {
        return new Rx.Observable<Identity>((obs: Rx.Subscriber<Identity>) =>
        {
            this.identity = undefined;

            if (!this.appSettings.requireAuthentication)
            {
                this.identity = new Identity("DEVELOPMENT", "00000000-0000-0000-0000-000000000000", this.appSettings.minimumRoleLevel);
                obs.next(this.identity);
                obs.complete();
                return;
            }

            if (!name || !password || name.length === 0 || password.length === 0)
            {
                obs.error(new Error("name or password not supplied"));
                return;
            }
            
            const url = `${this.appSettings.gatewayServiceUrl}Account/GetUserFromLogin?name=${name}&password=${password}`;

            Rx.Observable.ajax.get(url)
                .subscribe(
                    (value: Rx.AjaxResponse) =>
                    {
                        let response = TypedJSON.parse(TypedJSON.stringify(value.response), GetUserResponse);
                        if(!response)
                        {
                            obs.error(new Error("Unrecognized response"));
                            return;
                        }

                        if(!response.success)
                        {
                            obs.error(new Error(response.message));
                            return;
                        }

                        if(response.data)
                            this.identity = new Identity(response.data.name, response.data.identity, response.data.roleLevel);
                        else
                            this.identity = undefined;

                        obs.next(this.identity);
                    },
                    (error: Rx.AjaxError) => obs.error(new Error(error.message)),
                    () => obs.complete()
                );
        });
    }



    /**
    * Authorizes an existing identity token, if one is available
    *
    * @param token {string} The token to authorize
    * @returns {Rx.Observable<Identity>} A observable that will resolve to an identity if the token is valid, otherwise null
    */
    authorize(token: string): Rx.Observable<Identity>
    {
        return new Rx.Observable<Identity>((obs: Rx.Subscriber<Identity>) =>
        {
            this.identity = undefined;

            if (!this.appSettings.requireAuthentication)
            {
                this.identity = new Identity("DEVELOPMENT", "00000000-0000-0000-0000-000000000000", this.appSettings.minimumRoleLevel);
                obs.next(this.identity);
                obs.complete();
                return;
            }

            if (!token || token.length === 0)
            {
                obs.error(new Error("token not supplied"));
                return;
            }

            let url = `${this.appSettings.gatewayServiceUrl}Account/GetUserFromIdentity?identity=${token}`;

            Rx.Observable.ajax.get(url)
                .subscribe(
                    (value: Rx.AjaxResponse) =>
                    {
                        let response = TypedJSON.parse(TypedJSON.stringify(value.response), GetUserResponse);
                        if(!response)
                        {
                            obs.error(new Error("Unrecognized response"));
                            return;
                        }

                        if(!response.success)
                        {
                            obs.error(new Error(response.message));
                            return;
                        }

                        if(response.data)
                            this.identity = new Identity(response.data.name, response.data.identity, response.data.roleLevel);
                        else
                            this.identity = undefined;

                        obs.next(this.identity);
                    },
                    (error: Rx.AjaxError) => obs.error(new Error(error.message)),
                    () => obs.complete()
                );
        });
    }
}

export class Identity
{
    constructor(public name: string, public token: string, public roleLevel: number) {}
}

@JsonObject
export class LoginUser
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
class GetUserResponse implements IServiceResponse<LoginUser>
{
    @JsonMember
    success: boolean;

    @JsonMember
    message: string;

    @JsonMember
    data: LoginUser;
}
