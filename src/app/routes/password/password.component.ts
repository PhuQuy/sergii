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
        password: '',
        survey: ''
    }
    repassword: string = '';
    error;
    success;
    checkUser;
    surveyId = '';
    constructor(private activatedRoute: ActivatedRoute, private serveyService: ServeyService, private userService: UserService, private router: Router) {
        this.activatedRoute.params.subscribe(params => {
            if (params['id']) {
                this.surveyId = params['id'];
                this.serveyService.getById(params['id']).subscribe(survey => {
                    this.user.email = survey[0].email;
                    this.user.survey = params['id'];
                    userService.getUserByEmail(survey[0].email).subscribe(user => {
                        this.checkUser = user[0];
                        // if(this.checkUser) {
                        //     this.router.navigate(['/notfound']);
                        // }
                    });
                    if (!this.user.email) {
                        this.router.navigate(['/notfound']);
                    }
                });

                // userService.getUserBySurvey(params['id']).subscribe(user => {
                //     this.checkUser = user[0];
                // })
            }
        });
    }

    ngOnInit() {
    }

    submit() {
        this.success = false;
        this.error = '';
        if (this.repassword === this.user.password) {
            this.userService.createUser(this.user).subscribe(res => {
                console.log(res);

                this.success = true;
            }, error => {
                // this.error = error;
                this.success = true;

            });
        } else {
            this.error = "Password does not match! Please try again!";
        }
    }

}
