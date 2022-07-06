import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  userData = {
    id: '',
    username: '',
    group: '',
    correo: '',
    nombre: '',
    apellido: ''
  };


  constructor(
    private authService: AuthService,

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
          this.userData.correo = res['data'][0]['correo']
          this.userData.nombre = res['data'][0]['nombre']
          this.userData.apellido = res['data'][0]['apellido']
          console.log(this.userData)
        },
        error: (err) => {
          console.log(err)

        }
      })
  }


  logout() {
    this.authService.logout();
  }
}
