import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ServeyService {

  constructor(private http: Http) { }

   createSurvey(survey) {
    return this.http.post('http://localhost:3000/api/survey', survey).subscribe((res: Response) => {
        return res.json();
    });
}
}
