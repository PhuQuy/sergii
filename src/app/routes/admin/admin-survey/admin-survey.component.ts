import {
  Component,
  OnInit,
} from '@angular/core';
import { ServeyService as SurveyService } from '../../../services/servey.service';

@Component({
  selector: 'app-admin-survey',
  templateUrl: './admin-survey.component.html',
  styleUrls: ['./admin-survey.component.css'],
})
export class AdminSurveyComponent implements OnInit {

  public survey: Array<any>;
  public head = [{ key: 'name', value: 'Name' }, { key: 'gender', value: 'Gender' },
  { key: 'birthDay', value: 'Birthday' },
  { key: 'postCode', value: 'Postcode' }, { key: 'email', value: 'Email' }];
  order: string = '';
  reverse: boolean = false;
  term = '';
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

  sortByHeader(item) {
    if (item.key === this.order) {
      this.reverse = !this.reverse;
    }
    this.order = item.key;
  }
}
