import { Routes } from '@angular/router';
import { LoginCompoent } from './auth/components/register/login.component';
import { RegisterCompoent } from './auth/components/login/register.component';

export const routes: Routes = [
    {
        path: 'register',
        component: RegisterCompoent
    },
    {
        path: 'login',
        component: LoginCompoent
    }
];
