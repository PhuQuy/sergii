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
  // host = "http://localhost:3000";
  host = '';

  constructor(private http: HttpClient) {
  }

  public getUsers() {
    return this.http.get(`${environment.domain}/api/users`);
  }

  createUser(user): Observable<any> {
    return this.http.post(`${this.host}/api/users`, user);
  }

  getById(id) {
    return this.http.get(`${this.host}/api/survey/${id}`).pipe(
      map((res: any) => {
        return JSON.parse(res[ '_body' ]);
      }),
      catchError(this.handleError),
    );
  }

  authentication(email, password) {
    return this.http.post(`${this.host}/api/users/login`, { email: email, password: password }).pipe(
      map((res) => JSON.parse(res[ '_body' ])),
      catchError(this.handleError),
    );
  }

  protected handleError(error: any) {
    return throwError(error);
  }
}
