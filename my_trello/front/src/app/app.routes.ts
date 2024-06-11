import { CanActivateFn, Router, Routes } from '@angular/router';
import { LoginCompoent } from './auth/components/login/login.component';
import { RegisterCompoent } from './auth/components/register/register.component';
import { HomeComponent } from './home/home.componet';
import { AuthGuardService } from './auth/services/authGuard.service';
import { Observable, map } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { BoardsComponent } from './boards/boards.componet';

const canActive: CanActivateFn = (): Observable<boolean> => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.isLogged$.pipe(map(logged => {
        if(logged){
            return true;
        }
        router.navigateByUrl("/boards");
        return false;
    }))
};

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'register',
        component: RegisterCompoent
    },
    {
        path: 'login',
        component: LoginCompoent
    },
    {
        path: 'boards',
        component: BoardsComponent,
        canActivate: [canActive]
    }
];
