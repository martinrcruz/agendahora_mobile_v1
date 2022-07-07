import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  response: any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    // console.log(this.authService.isLoggedIn())
    this.authService.isLoggedIn()
      .subscribe({
        next: (res) => {
          this.response = res['estado']
          console.log(res['estado'])
          if (this.response == 0) {
            this.router.navigateByUrl('login')
          }else {
            return true;
          }
        },
        error: (err) => {
          console.log(err)
        }
      })


    if (this.response == 0) {
      this.router.navigateByUrl('login')
      return false;
    }

    return true;
  }




}
