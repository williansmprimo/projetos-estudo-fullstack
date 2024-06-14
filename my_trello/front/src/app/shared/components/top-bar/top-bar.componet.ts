import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";
import { AuthService } from "../../../auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "top-bar",
    templateUrl: "./top-bar.component.html",
    standalone: true,
    imports: [
        MenubarModule,
        ButtonModule
    ]
})
export class TopBarComponent{
   constructor(private authService: AuthService, private router: Router){}

   logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
   }
}