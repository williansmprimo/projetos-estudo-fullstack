import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";
import { AuthService } from "../../../auth/services/auth.service";
import { Router } from "@angular/router";
import { SocketIoService } from "../../services/socket.io.service";

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
   constructor(
    private authService: AuthService,
    private socketService: SocketIoService,
    private router: Router
){}

   logout(){
    this.authService.logout();
    this.socketService.disconnect();
    this.router.navigateByUrl('/');
   }
}