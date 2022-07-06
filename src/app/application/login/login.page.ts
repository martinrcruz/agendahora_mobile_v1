import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService) { }

  public visible = false;
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  ngOnInit() {
  }

  loginForm = new FormGroup({
    identity: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  loginMobile(id, pass) {
    var formData = new FormData();
    formData.append("identity", id.value);
    formData.append("password", pass.value);
    this.authService.login(formData)
  }

}
