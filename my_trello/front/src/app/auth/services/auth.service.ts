import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginRequest, User } from "../types/user.interface";

@Injectable()
export class AuthService {
    baseURL = environment.baseURL;

    currentUser$ = new BehaviorSubject<User | null | undefined>(undefined);
    /*isLogged$ = this.currentUser$.pipe(
        filter((user) => !!user),
        map(Boolean)
    );*/

    constructor(private http: HttpClient){}

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(this.baseURL + '/users',)
    }

    setCurrentUser(user: User | null){
        this.currentUser$.next(user);
        this.setToken(user);
    }

    setToken(user: User | null){
        if(user?.token){
            localStorage.setItem('token', user.token);
        }
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(this.baseURL + '/users',user);
    }

    login(request: LoginRequest): Observable<User> {
        return this.http.post<User>(this.baseURL + '/users/login',request);
    }
}