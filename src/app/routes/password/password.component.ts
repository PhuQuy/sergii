import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ServeyService } from '../../services/servey.service';
import { UserService } from '../../services/user.service';

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
    constructor(private activatedRoute: ActivatedRoute, private serveyService: ServeyService, private userService: UserService) {
        this.activatedRoute.params.subscribe(params => {
            if (params['id']) {
                serveyService.getById(params['id']).subscribe(survey => {
                    this.survey = survey;
                    this.user.email = survey;
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
