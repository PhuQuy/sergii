import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        let user = localStorage.getItem('user');
        
        if (user && user != 'x') {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
        // return this.afAuth.authState
        //   .take(1)
        //   .map(user => !!user)
        //   .do(loggedIn => {
        //     if (!loggedIn) {
        //       console.log('access denied')
        //       this.router.navigate(['/account/login']);
        //     }
        //   })
    }
}
