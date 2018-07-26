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
    constructor(public router: Router) { }

    ngOnInit() {
    }

    nextSlide() {
        this.slide++;
    }

    previousSlide() {
        if (this.slide > 1) {
            this.slide--;
        }
    }

    next() {
        this.router.navigateByUrl('/');
    }
}
