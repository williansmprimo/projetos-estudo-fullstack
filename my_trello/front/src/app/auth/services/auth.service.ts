import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginRequest, User } from "../types/user.interface";

@Injectable()
export class AuthService {
    baseURL = environment.baseURL;
    currentUser: User | null = null;

    constructor(private http: HttpClient){}

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(this.baseURL + '/users');
    }

    setCurrentUser(user: User | null){
        this.currentUser = user;
        this.setToken(user);
    }

    setToken(user: User | null){
        if(user?.token){
            localStorage.setItem('token', user.token);
        }else{
            localStorage.removeItem('token');
        }
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(this.baseURL + '/users',user);
    }

    login(request: LoginRequest): Observable<User> {
        return this.http.post<User>(this.baseURL + '/users/login',request);
    }

    logout(){
        this.setCurrentUser(null);
    }
}