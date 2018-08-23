import { Injectable } from '@angular/core';
import {
    catchError,
    map,
} from 'rxjs/operators';
import {
    Observable,
    throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    public getUsers() {
        return this.http.get(`${environment.domain}/api/users`);
    }

    createUser(user): Observable<any> {
        return this.http.post(`${environment.domain}/api/users`, user);
    }

    getById(id) {
        return this.http.get(`${environment.domain}/api/survey/${id}`).pipe(
            map((res: any) => {
                return JSON.parse(res['_body']);
            }),
            catchError(this.handleError),
        );
    }

    getUserById(id) {
        return this.http.get(`${environment.domain}/api/users/${id}`).pipe(
            map((res: any) => {
                return JSON.parse(res['_body']);
            }),
            catchError(this.handleError),
        );
    }


    checkExistEmail(email) {
        return this.http.post(`${environment.domain}/api/users/check`, { email: email }).pipe(
            map((res: any) => {
                return res;
            }),
            catchError(this.handleError),
        );
    }

    forgotPassword(email) {
        return this.http.post(`${environment.domain}/api/users/forgot-passowrd`, { email: email }).pipe(
            map((res: any) => {
                return res;
            }),
            catchError(this.handleError),
        );
    }

    resetPassword(resetString, passowrd) {
        return this.http.post(`${environment.domain}/api/users/reset-passowrd`, { resetString: resetString, newPassowrd: passowrd }).pipe(
            map((res: any) => {
                return res;
            }),
            catchError(this.handleError),
        );
    }

    getUserByEmail(email) {
        return this.http.post(`${environment.domain}/api/users/email`, { email: email }).pipe(
            map((res: any) => {
                return res;
            }),
            catchError(this.handleError),
        );
    }

    getUserBySurvey(surveyId) {
        return this.http.get(`${environment.domain}/api/users/survey/${surveyId}`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError(this.handleError),
        );
    }

    authentication(email, password) {
        return this.http.post(`${environment.domain}/api/users/login`, { email: email, password: password }).pipe(
            map((res) => res),
            catchError(this.handleError),
        );
    }

    delete(id) {
        return this.http.delete(`${environment.domain}/api/users/${id}`).pipe(
            map((res: any) => res.ok),
            catchError(this.handleError),
        );
    }

    protected handleError(error: any) {
        return throwError(error);
    }
}
