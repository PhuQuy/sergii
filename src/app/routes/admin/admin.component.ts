import {
    Component,
    OnInit,
    ElementRef
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { LogOut } from '../../store/actions/auth.actions';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    user: string;
    constructor(private store: Store<AppState>, private router: Router, private userService: UserService) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
    }

    logout() {
        this.store.dispatch(new LogOut);
        this.userService.logout().subscribe(() => {

        })
        this.router.navigateByUrl('/');
    }
}
