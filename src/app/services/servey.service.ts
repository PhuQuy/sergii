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
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServeyService {

  constructor(private http: HttpClient) {
  }

  public getSurvey() {
    return this.http.get(`${environment.domain}/api/survey`);
  }

  createSurvey(survey) {
    return this.http.post(`${environment.domain}/api/survey`, survey).subscribe((res: Response) => {
      return res;
    });
  }

  getById(id) {
    return this.http.get(`${environment.domain}/api/survey/${id}`).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }

  protected handleError(error: any) {
    return throwError(error);
  }
}
