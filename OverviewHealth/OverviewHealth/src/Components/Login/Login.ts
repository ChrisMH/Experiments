import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { go } from "@ngrx/router-store";

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
    
    onNgInit(): void
    {
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
            .take(1)
            .subscribe((state: identity.State) =>
            {
                this.submitting = false;

                if(state.loggedIn)
                {
                    const routerState = router.getState(this.store);
                    this.store.dispatch(go(""));
                }
                else
                {
                    this.attempted = true;
                }
            })
    }
}
