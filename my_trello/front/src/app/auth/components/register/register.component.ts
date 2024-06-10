import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "auth-register",
    templateUrl: "./register.component.html",
    standalone: true
})
export class RegisterCompoent{
    constructor(private authService: AuthService){}

    login(){

    }
}