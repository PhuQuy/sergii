import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // host = "http://localhost:3000";
    host = '';
    constructor(private http: Http) { }

    createUser(user) {
        return this.http.post(`${this.host}/api/users`, user);
    }

    getById(id) {
        return this.http.get(`${this.host}/api/survey/${id}`)
            .pipe(
                map((res: Response) => {
                    return JSON.parse(res['_body']);
                }),
                catchError(this.handleError)
            );
    }

    authentication(email, password) {
        return this.http
            .post(`${this.host}/api/users/login`, { email: email, password: password }).pipe(
                map((res) => JSON.parse(res['_body'])),
                catchError(this.handleError)
            )
    }

    protected handleError(error: any) {
        return throwError(error);
    }
}
