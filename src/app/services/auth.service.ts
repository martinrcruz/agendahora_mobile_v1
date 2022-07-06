import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private logged_user = new BehaviorSubject(null);
  user_data$ = this.logged_user.asObservable();

  private is_logged = new BehaviorSubject(null);
  logged_user$ = this.is_logged.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'auth';


  isLoggedIn() {
    // return this.http.get(`${this.apiUrl}${this.controllerUrl}/is_logged_in`, { withCredentials: true });
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/get_user_data`, { withCredentials: true })
    // .subscribe({
    //   next: (res) => {
    //     console.log(res['estado']);
    //     return res['estado'];
    //   },
    //   error: (err) => {
    //     console.log(err)
    //     return err['error'];
    //   }
    // })
  }

  login(data: any) {
    this.http.post(`${this.apiUrl}${this.controllerUrl}/login`, data, { withCredentials: true })
      .subscribe({
        next: (res) => {
          console.log(res)
          this.router.navigate(['/'])

        },
        error: (err) => {
          console.log(err)
          this.router.navigate(['auth/login'])

        }
      })
  }


  forgot(data: any) {
    this.http.post(`${this.apiUrl}${this.controllerUrl}/forgot_password`, data)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.router.navigate(['/'])
        },
        error: (err) => {
          console.log(err)
          this.router.navigate(['login'])

        }
      })
  }

  getUserData() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/get_user_data`, { withCredentials: true })
  }

  logout() {
    this.http.get(`${this.apiUrl}${this.controllerUrl}/logout`, { withCredentials: true })
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('login')
        },
        error: (err) => {
          console.log(err)

        }
      })
    this.router.navigateByUrl('login')

  }

}
