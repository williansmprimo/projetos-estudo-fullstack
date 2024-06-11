import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from "primeng/card";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginRequest } from "../../types/user.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, RouterModule } from "@angular/router";
import { MessagesModule } from "primeng/messages";
import { Message } from "primeng/api";

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
        RouterModule,
        MessagesModule
    ]
})
export class LoginCompoent{
    errorMessages: Message[] = [];
    form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ){}

    register(){
        const loginRequest: LoginRequest = {
            username: String(this.form.get("username")?.value),
            password: String(this.form.get("password")?.value)
        }
        this.authService.login(loginRequest).subscribe({
            next: (user) => {
                this.authService.setCurrentUser(user);
                this.errorMessages = [];
                this.router.navigateByUrl('/');
            },
            error: (error: HttpErrorResponse) => {
                this.errorMessages = [{
                    summary: error.error.error,
                    severity: "error"
                }];
                console.log('Errors:', this.errorMessages);
            }
        });
    }
}