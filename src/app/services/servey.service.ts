import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ServeyService {

  constructor(private http: Http) { }

   createSurvey(survey) {
    return this.http.post('/api/survey', survey).subscribe((res: Response) => {
        return res;
    });
}
}
