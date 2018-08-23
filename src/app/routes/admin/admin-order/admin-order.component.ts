import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  public head = [ 'Customer Name', 'Email', 'Settlement Date', 'Subscription Type', 'End Date' ];
  constructor() { }

  ngOnInit() {
  }

}
