import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    providers: [UserService]
})
export class ResetPasswordComponent implements OnInit {
    password = '';
    repassword = '';
    resetString = '';
    error = '';
    success = false;
    loading = false;
    constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => {
            if (params['id']) {
                this.resetString = params['id'];
            }
        });
    }
    ngOnInit() {
    }

    submit() {
        this.error = '';
        this.success = false;
        this.loading = true;
        if (this.repassword !== this.password) {
            this.error = "Password does not match! Please try again!";
            return;
        }

        this.userService.resetPassword(this.resetString, this.password).subscribe(res => {
            this.loading = false;

            if (Boolean(res)) {
                this.success = true;
            } else {
                this.error = 'Error';
            }
        })
    }
}
