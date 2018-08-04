import {
  Component,
  OnInit,
} from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: [ './admin-user.component.css' ],
})
export class AdminUserComponent implements OnInit {

  public users: Array<any>;
  public head = [ 'Name', 'Password', 'Email' ];

  constructor(private userService: UserService) {
  }

  public ngOnInit() {
    this.getUsers();
  }

  public getUsers() {
    this.userService.getUsers().subscribe(((users: Array<any>) => {
      console.log('user', users);
      this.users = users;
    }));
  }

}
