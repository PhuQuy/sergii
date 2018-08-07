import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ServeyService } from '../../services/servey.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.css'],
    providers: [ServeyService]
})
export class PasswordComponent implements OnInit {
    survey: any;
    user = {
        email: '',
        password: ''
    }
    repassword: string = '';
    error;
    success;
    checkUser;
    constructor(private activatedRoute: ActivatedRoute, private serveyService: ServeyService, private userService: UserService, private router: Router) {
        this.activatedRoute.params.subscribe(params => {
            if (params['id']) {

                serveyService.getById(params['id']).subscribe(survey => {
                    this.user.email = survey[0].email;
                    userService.getUserByEmail(survey[0].email).subscribe(user => {
                        this.checkUser = user [0];
                        if(this.checkUser) {
                            this.router.navigate(['/notfound']);
                        }
                    });
                });
            }
        });
    }

    ngOnInit() {
    }

    submit() {
        if (this.repassword === this.user.password) {
            this.userService.createUser(this.user).subscribe(res => {
                this.success = true;
            }, error => {
                this.error = error;
            });
        } else {
            this.error = "Password does not match! Please try again!";
        }
    }

}
