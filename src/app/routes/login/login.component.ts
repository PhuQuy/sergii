import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    email: string = '';
    password: string = '';
    error: boolean = false;
    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
    }

    login() {
        this.userService.authentication(this.email, this.password).subscribe(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                this.router.navigateByUrl(`/user/${user['_id']}`);
            } else {
                this.error = true;
            }
        }, error => {
            this.error = error;
        });
    }
}
