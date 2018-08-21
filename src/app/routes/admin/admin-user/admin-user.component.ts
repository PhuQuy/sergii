import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent implements OnInit {
  public users;
  public customerHead = [{ label: 'Name', property: 'name.last' }, { label: 'Email', property: 'email' },
                        { label: 'Postal Code', property: 'postalCode' }, { label: 'Address', property: 'address' },
                        { label: 'Registration Date', property: 'registrationDate' },
                        { label: 'Active Subscription', property: 'activeSubscription' }, 
                        { label: 'Day Left', property: 'dayLeft' }];

  order: string = '';
  reverse: boolean = false;
  public orderHead = ['Customer Name', 'Email', 'Settlement Date', 'Subscription Type Purchased', 'Day Till End of Subscription'];
  constructor(private userService: UserService) {
  }

  public ngOnInit() {
    this.getUsers();
  }

  public getUsers() {
    this.userService.getUsers().subscribe((users: any) => {
      console.log(users);
      this.users = users;
    });
  }

  sortByHeader(item) {
    if (item.property === this.order){
      this.reverse = !this.reverse;
    }
    this.order = item.property;
  }
}
