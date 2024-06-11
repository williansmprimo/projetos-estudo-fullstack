import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from "primeng/card";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginRequest } from "../../types/user.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { RouterModule } from "@angular/router";

@Component({
    selector: "auth-login",
    templateUrl: "./login.component.html",
    standalone: true,
    imports: [
        InputTextModule,
        PasswordModule,
        ButtonModule,
        CardModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class LoginCompoent{
    error = '';
    form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder
    ){}

    register(){
        const loginRequest: LoginRequest = {
            username: String(this.form.get("username")?.value),
            password: String(this.form.get("password")?.value)
        }
        this.authService.login(loginRequest).subscribe({
            next: (user) => {
                this.authService.setCurrentUser(user);
            },
            error: (error: HttpErrorResponse) => {
                this.error = error.error.join(', ');
            }
        });
    }
}