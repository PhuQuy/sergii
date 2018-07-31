import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServeyService {
    // host = "http://localhost:3000";
    host = '';
    constructor(private http: Http) { }

    createSurvey(survey) {
        return this.http.post(`${this.host}/api/survey`, survey).subscribe((res: Response) => {
            return res;
        });
    }

    getById(id) {
        return this.http.get(`${this.host}/api/survey/${id}`)
            .pipe(
                map((res: Response) => {
                    let data: any = res;
                    return data._body;
                }),
                catchError(this.handleError)
            );
    }

    protected handleError(error: any) {
        return throwError(error);
      }
}
