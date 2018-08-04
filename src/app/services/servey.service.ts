import { Injectable } from '@angular/core';
import {
  catchError,
  map,
} from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  HttpClient,
  HttpResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServeyService {
  // host = "http://localhost:3000";
  host = '';

  constructor(private http: HttpClient) {
  }

  createSurvey(survey) {
    return this.http.post(`${this.host}/api/survey`, survey).subscribe((res: Response) => {
      return res;
    });
  }

  getById(id) {
    return this.http.get(`${this.host}/api/survey/${id}`).pipe(
      map((res: any) => res._body),
      catchError(this.handleError),
    );
  }

  protected handleError(error: any) {
    return throwError(error);
  }
}
