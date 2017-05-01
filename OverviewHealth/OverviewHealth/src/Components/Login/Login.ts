import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { go } from "@ngrx/router-store";

import { AppState } from "../../Store";
import { AppSettings, Identity, OvCookieService, OvPrincipalService } from "../../Services";

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
        protected appState: Store<AppState>,
        protected appSettings: AppSettings, 
        protected cookieService: OvCookieService,
        protected principalService: OvPrincipalService)
    {
        const rememberMe = this.cookieService.getRememberMe();
        let name: string;
        if(rememberMe)
            name = this.cookieService.getUserName();

        this.form = formBuilder.group({
            name: [name, Validators.required], 
            password: [undefined, Validators.required],
            rememberMe: rememberMe});
    }

    onSubmit(): void
    {
        this.submitting = true;
        const name: string = this.form.controls.name.value;
        const password: string = this.form.controls.password.value;
        const rememberMe: boolean = this.form.controls.rememberMe.value;

        let sub = this.principalService.authenticate(name, password)
            .subscribe((identity: Identity) =>
            {
                if(rememberMe)
                {
                    this.cookieService.setUserName(name);
                    this.cookieService.setRememberMe(true);
                }
                else
                {
                    this.cookieService.removeUserName();
                    this.cookieService.setRememberMe(false);
                }

                this.cookieService.setIdentityToken(identity.token);
                
                sub.unsubscribe();
                this.appState.dispatch(go(""));
            },
            (err: any) =>
            {
                sub.unsubscribe();
                this.attempted = true;
                this.submitting = false;
            });
    }
}
