import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as postcode from 'postcode-validator'
import { ServeyService } from '../../services/servey.service';

@Component({
    selector: 'app-your-choise',
    templateUrl: './your-choise.component.html',
    styleUrls: ['./your-choise.component.scss'],
    providers: [ServeyService]
})
export class YourChoiseComponent implements OnInit {
    user = {
        consumedPill: null
    };
    minDate = { year: 1800, month: 1, day: 1 };

    confirm: boolean = false;
    sex: string = 'gender';
    errorSex;
    errorPostCode;
    okPostCode: boolean = false;
    email: string = '';
    okSex: boolean = false;
    okEmail: boolean = false;
    errorEmail;
    model;
    slide = 1;
    percent = 0;
    fullStep = 10;

    survey = {
        name: '',
        gender: null,
        birthDay: null,
        postCode: '',
        email: '',
        questions: []
    }

    questions = [
        {
            title: 'Did you ever consumed pills?',
            options: [
                {
                    value: 'Yes'
                },
                {
                    value: 'No'
                }
            ]
        },
        {
            title: 'Do you have preference which to use?',
            options: [
                {
                    value: 'Option1'
                },
                {
                    value: 'Option2'
                },
                {
                    value: 'Option3'
                }
            ]
        },
        {
            title: 'Take advantage of generic option?',
            options: [
                {
                    value: 'Option1'
                },
                {
                    value: 'Option2'
                },
                {
                    value: 'Option3'
                }
            ]
        },
        {
            title: 'How often you want to renew your subscription?',
            options: [
                {
                    value: 'Option1'
                },
                {
                    value: 'Option2'
                },
                {
                    value: 'Option3'
                }
            ]
        },
        {
            title: 'Did you experience any serious side effects <strong>that made you stop</strong>?',
            options: [
                {
                    value: 'No, never had any side effects'
                },
                {
                    value: 'No, side effects did not make me stop'
                },
                {
                    value: 'Yes'
                }
            ]
        },
        {
            title: 'Have you had a physical exam with a healthcare provider in the past five years? If so, did the provider also examine the genitals? If not, we recommend visiting a healthcare provider before using our services?',
            options: [
                {
                    value: 'Yes, it was normal'
                },
                {
                    value: 'Yes, but there were issues'
                },
                {
                    value: 'No'
                }
            ]
        }
    ]

    constructor(public router: Router, public serveyService: ServeyService) { 
        this.fullStep = 4 + this.questions.length;
    }

    ngOnInit() {
        this.percent = this.slide * 100 / this.fullStep;
    }

    nextSlide() {
        this.slide++;
        this.percent = this.slide * 100 / this.fullStep;

        if (this.slide == this.fullStep) {
            this.survey.birthDay = `${this.survey.birthDay.month}/${this.survey.birthDay.day}/${this.survey.birthDay.year}`;            
            this.serveyService.createSurvey(this.survey);
        }
    }

    previousSlide() {
        if (this.slide > 1) {
            this.slide--;
            this.percent = this.slide * 100 / this.fullStep;
        }
    }

    addQuestion(title, anwser) {
        this.survey.questions.push({question: title, anwser: anwser});
    }

    valueChange(e) {
        let chIbn = e.split('-').join('');
        if (chIbn.length > 0) {
            if (!e.match(new RegExp('.{1,3}-', 'g')))
                chIbn = chIbn.match(new RegExp('.{1,3}', 'g')).join('-');
            else
                chIbn = e;
        }
        this.survey.postCode = chIbn;
    }

    next() {
        this.router.navigateByUrl('/');
    }

    nextT() {
        if (this.errorSex) {
            this.router.navigateByUrl('/');
            return;
        }
        if (this.survey.gender == 'Male') {
            this.errorSex = 'Sorry, we don’t have service for you. Thank you for your attention';
            return;
        }

        this.okSex = true;

        this.nextSlide();
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    checkPostCode() {
        const that = this;
        if (this.errorPostCode) {
            this.router.navigateByUrl('/');
            return;
        }
        if (this.survey.postCode) {
            let check = postcode.validate(that.survey.postCode, 'JP');
            if (check) {
                that.okPostCode = true;
                that.nextSlide();
            } else {
                that.errorPostCode = 'Sorry, we don’t have service in your area. Thank you for your attention';
            }
        }
    }

    checkEmail() {
        if (this.validateEmail(this.survey.email)) {
            this.nextSlide();
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    scrollBottom() {
        setTimeout(function () { window.scrollTo(0, document.body.scrollHeight); }, 100);
    }
}
