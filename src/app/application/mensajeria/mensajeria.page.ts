import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.page.html',
  styleUrls: ['./mensajeria.page.scss'],
})
export class MensajeriaPage implements OnInit {

  userData = {
    id: '',
    username: '',
    group: ''
  };


  constructor(
    private authService: AuthService

  ) { }

  ngOnInit() {
    this.getUserData();

  }

  getUserData() {
    this.authService.getUserData()
      .subscribe({
        next: (res) => {
          this.userData.id = res['data'][0]['id_usuario']
          this.userData.username = res['data'][0]['username']
          this.userData.group = res['data'][0]['grupo']
        },
        error: (err) => {
          console.log(err)

        }
      })
  }


}
