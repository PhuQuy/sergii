import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// var postcode = require('');
import * as postcode from 'postcode-validator'

@Component({
    selector: 'app-your-quote',
    templateUrl: './your-quote.component.html',
    styleUrls: ['./your-quote.component.scss']
})
export class YourQuoteComponent implements OnInit {
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
    constructor(public router: Router) { }

    ngOnInit() {
    }

    next() {
        if (this.errorSex) {
            this.router.navigateByUrl('/');
            return;
        }
        if (this.sex == 'Male') {
            this.errorSex = 'Sorry, we don’t have service for you. Thank you for your attention';
            return;
        }

        this.okSex = true;
        this.scrollBottom();

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
                that.scrollBottom();
            } else {
                that.errorPostCode = 'Sorry, we don’t have service in your area. Thank you for your attention';
            }
        }
    }

    checkEmail() {
        if (this.validateEmail(this.email)) {
            this.router.navigateByUrl('/your-answer');
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
