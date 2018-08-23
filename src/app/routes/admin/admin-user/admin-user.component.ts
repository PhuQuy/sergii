import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComfirmationModalComponent } from '../../../components/comfirmation-modal/comfirmation-modal.component';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent implements OnInit {
  public users;
  term = '';
  public customerHead = [{ label: 'Name', property: 'name.last' }, { label: 'Email', property: 'email' },
  { label: 'Postal Code', property: 'postalCode' }, { label: 'Address', property: 'address' },
  { label: 'Registration Date', property: 'registrationDate' },
  { label: 'Active Subscription', property: 'activeSubscription' },
  { label: 'Day Left', property: 'dayLeft' }];

  order: string = '';
  reverse: boolean = false;
  public orderHead = ['Customer Name', 'Email', 'Settlement Date', 'Subscription Type Purchased', 'Day Till End of Subscription'];
  constructor(private userService: UserService, private modalService: NgbModal) {
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
    if (item.property === this.order) {
      this.reverse = !this.reverse;
    }
    this.order = item.property;
  }

  delete(id) {
    const that = this;
    const confirmModalRef = this.modalService.open(ComfirmationModalComponent, { size: 'sm' });
    confirmModalRef.componentInstance.title = 'Confirmation'
    confirmModalRef.componentInstance.message = 'Do you want to delete user?';
    confirmModalRef.result.then((result) => {
      this.userService.delete(id).subscribe(res => {
        console.log(res);
        if (res) this.getUsers();
      });
    }, () => { })
  }
}
