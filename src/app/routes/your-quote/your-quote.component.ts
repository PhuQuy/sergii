import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-your-quote',
    templateUrl: './your-quote.component.html',
    styleUrls: ['./your-quote.component.scss']
})
export class YourQuoteComponent implements OnInit {
    confirm: boolean = false;
    sex:string = 'gender';
    constructor() { }

    ngOnInit() {
    }

}
