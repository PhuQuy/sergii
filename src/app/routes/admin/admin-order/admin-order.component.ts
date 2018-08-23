import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  public head = [{ key: 'customerName', value: 'Customer Name' }, { key: 'email', value: 'Email' },
  { key: 'settlementDate', value: 'Settlement Date' },
  { key: 'subscriptionType', value: 'Subscription Type' }, { key: 'endDate', value: 'End Date' }];
  order: string = '';
  reverse: boolean = false;
  term = '';
  constructor() { }

  orders = [
    {
      customerName: 'Cristiano Ronaldo',
      email: 'cr7@gmail.com',
      settlementDate: '08/20/2018',
      subscriptionType: '3 months',
      endDate: '11/20/2018'
    },
    {
      customerName: 'PSG.LGD Maybe',
      email: 'M-God@gmail.com',
      settlementDate: '08/20/2018',
      subscriptionType: '2 months',
      endDate: '11/20/2018'
    },
    {
      customerName: 'PSG.LGD Ame',
      email: 'Ame@gmail.com',
      settlementDate: '08/20/2018',
      subscriptionType: '4 months',
      endDate: '11/20/2018'
    },
    {
      customerName: 'OG Nobrain',
      email: 'bigBrain@gmail.com',
      settlementDate: '08/20/2018',
      subscriptionType: '1 months',
      endDate: '11/20/2018'
    }
  ]

  ngOnInit() {
  }

  sortByHeader(item) {
    if (item.key === this.order) {
      this.reverse = !this.reverse;
    }
    this.order = item.key;
  }
}
