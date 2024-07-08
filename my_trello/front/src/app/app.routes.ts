import { Routes } from '@angular/router';
import { LoginCompoent } from './auth/components/login/login.component';
import { RegisterCompoent } from './auth/components/register/register.component';
import { HomeComponent } from './home/home.componet';
import { BoardsComponent } from './boards/boards.componet';
import { atuhGuard } from './auth/authGuard/auth.guard';
import { BoardComponent } from './shared/components/board/board.component';


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
        canActivate: [atuhGuard]
    },
    {
        path: 'boards/:id',
        component: BoardComponent,
        //canActivate: [atuhGuard]
    }
];
