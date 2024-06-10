import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../types/user.interface";

@Injectable()
export class AuthService {
    baseURL = environment.baseURL;

    currentUser$ = new BehaviorSubject<User | null | undefined>(undefined);

    constructor(private http: HttpClient){}

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(this.baseURL + '/users', {
            headers: {
                authorization: "Bearer " + this.currentUser$.value?.token
            }
        })
    }

    setCurrentUser(user: User | null){
        this.currentUser$.next(user);
    }
}