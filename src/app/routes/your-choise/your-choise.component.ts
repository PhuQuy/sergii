import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-your-choise',
    templateUrl: './your-choise.component.html',
    styleUrls: ['./your-choise.component.scss']
})
export class YourChoiseComponent implements OnInit {
    user = {
        consumedPill: null
    };

    slide = 1;
    percent = 0;
    constructor(public router: Router) { }

    ngOnInit() {
        this.percent = this.slide * 100 / 7;
    }

    nextSlide() {
        this.slide++;
        this.percent = this.slide * 100 / 7;


    }

    previousSlide() {
        if (this.slide > 1) {
            this.slide--;
            this.percent = this.slide * 100 / 7;

        }
    }

    next() {
        this.router.navigateByUrl('/');
    }
}
