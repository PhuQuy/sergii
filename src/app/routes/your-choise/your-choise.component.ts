import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as postcode from 'postcode-validator'

@Component({
    selector: 'app-your-choise',
    templateUrl: './your-choise.component.html',
    styleUrls: ['./your-choise.component.scss']
})
export class YourChoiseComponent implements OnInit {
    user = {
        consumedPill: null
    };
    confirm: boolean = false;
    sex: string = 'gender';
    errorSex;
    postcode = '';
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
    constructor(public router: Router) { }

    ngOnInit() {
        this.percent = this.slide * 100 / this.fullStep;
    }

    nextSlide() {
        this.slide++;
        this.percent = this.slide * 100 / this.fullStep;
    }

    previousSlide() {
        if (this.slide > 0) {
            this.slide--;
            this.percent = this.slide * 100 / this.fullStep;
        }
    }

    valueChange(e) {
        let chIbn = e.split('-').join('');
        if (chIbn.length > 0) {
            if (!e.match(new RegExp('.{1,3}-', 'g')))
                chIbn = chIbn.match(new RegExp('.{1,3}', 'g')).join('-');
            else
                chIbn = e;
        }
        this.postcode = chIbn;
    }

    next() {
        this.router.navigateByUrl('/');
    }

    nextT() {
        if (this.errorSex) {
            this.router.navigateByUrl('/');
            return;
        }
        if (this.sex == 'Male') {
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
        if (this.postcode) {
            let check = postcode.validate(that.postcode, 'JP');
            if (check) {
                that.okPostCode = true;
                that.nextSlide();
            } else {
                that.errorPostCode = 'Sorry, we don’t have service in your area. Thank you for your attention';
            }
        }
    }

    checkEmail() {
        if (this.validateEmail(this.email)) {
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
