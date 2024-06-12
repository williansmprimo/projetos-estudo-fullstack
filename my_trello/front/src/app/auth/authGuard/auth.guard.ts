import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map } from "rxjs";

export const atuhGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.currentUser$.pipe(map(logged => {
        if(logged){
            return true;
        }
        router.navigateByUrl("/login");
        return false;
    }));
    /*if(authService.currentUser$.value){
        return true;
    }
    router.navigateByUrl("/login");
    return false;*/
};