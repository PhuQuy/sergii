import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        
        if (user && user != 'x' && user['role'] == 1) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
