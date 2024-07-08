import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { SocketIoService } from "../../shared/services/socket.io.service";

export const atuhGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const socketService = inject(SocketIoService);
    const router = inject(Router);

    return new Observable<boolean>((observer) => {
        if(authService.currentUser){
            observer.next(true);
        }else{
            authService.getCurrentUser().subscribe({
                next: user => {
                    authService.setCurrentUser(user);
                    socketService.setupConnection(user);
                    observer.next(true);
                }, error: () => {
                    router.navigateByUrl('/login');
                }
            });
        }
    });
};