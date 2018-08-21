import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
    providers: [UserService]
})
export class ForgotPasswordComponent implements OnInit {
    email = '';
    error = false;
    success = false;
    loading = false;

    constructor(private userService: UserService) {

    }

    ngOnInit() {
    }

    submit() {
        this.error = false;
        this.success = false;
        this.loading = true;
        this.userService.forgotPassword(this.email).subscribe(res => {
            this.loading = false;

            if (Boolean(res)) {
                this.success = true;
            } else {
                this.error = true;
            }

        })
    }

}
