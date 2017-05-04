import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Store } from "@ngrx/store";
import { go } from "@ngrx/router-store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/first";

import { AppState } from "../../Store";
import * as identity from "../../Store/Identity";
import * as router from "../../Store/Router";

import { AppSettings } from "../../Services";

@Component({ 
    moduleId: module.id,
    selector: "login",
    templateUrl: "./Login.html",
    styleUrls: ["./Login.css"],
    host: { class: "view" }
})
 
export class Login
{
    protected form: FormGroup;

    protected attempted: boolean = false;
    protected submitting: boolean = false;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected formBuilder: FormBuilder,
        protected store: Store<AppState>,
        protected appSettings: AppSettings)
    {
        const identityState = identity.getState(this.store);

        this.form = this.formBuilder.group({
            name: [identityState.name, Validators.required], 
            password: [undefined, Validators.required],
            stayLoggedIn: identityState.stayLoggedIn});
    }
    
    onSubmit(): void
    {        
        this.submitting = true;
        const name: string = this.form.controls.name.value;
        const password: string = this.form.controls.password.value;
        const stayLoggedIn: boolean = this.form.controls.stayLoggedIn.value;

        this.store.dispatch(identity.authenticate(this.form.controls.name.value, this.form.controls.password.value, this.form.controls.stayLoggedIn.value));

        this.store.select(identity.key)
            .skipWhile((state: identity.State) => state.loggingIn)
            .first().subscribe((state: identity.State) =>
            {
                this.submitting = false;

                if(state.loggedIn)
                {
                    this.activatedRoute.queryParams
                        .first().subscribe((queryParams: Object) =>
                        {
                            if(queryParams.hasOwnProperty("returnUrl"))
                            {
                                let returnUrl: string = queryParams["returnUrl"];
                                while(returnUrl.startsWith("/"))
                                    returnUrl = returnUrl.slice(1);
                                this.router.navigate([returnUrl]);
                            }                                
                            else
                                this.router.navigate([""]);
                        });
                }
                else
                {
                    this.attempted = true;
                }
            });
    }
}
