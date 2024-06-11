import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable, map } from "rxjs";

export class AuthGuardService implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    canActivate(): Observable<boolean>{
        return this.authService.isLogged$.pipe(map(logged => {
            if(logged){
                return true;
            }
            this.router.navigateByUrl("/boards");
            return false;
        }))
    }
}