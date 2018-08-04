import {
  Component,
  OnInit,
} from '@angular/core';
import { ServeyService as SurveyService } from '../../../services/servey.service';

@Component({
  selector: 'app-admin-survey',
  templateUrl: './admin-survey.component.html',
  styleUrls: [ './admin-survey.component.css' ],
})
export class AdminSurveyComponent implements OnInit {

  public survey: Array<any>;
  public head = [ 'Name', 'Gender', 'Birthday', 'Postcode', 'Email' ];

  constructor(private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.getSurvey();
  }

  public getSurvey() {
    this.surveyService.getSurvey().subscribe(((survey: Array<any>) => {
      this.survey = survey;
      console.log('survey', survey);
    }));
  }

}
