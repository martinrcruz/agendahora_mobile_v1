import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-servicios-activos',
  templateUrl: './servicios-activos.page.html',
  styleUrls: ['./servicios-activos.page.scss'],
})
export class ServiciosActivosPage implements OnInit {

  userData = {
    id: '',
    username: '',
    group: ''
  };

  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    private servicioService: ServiciosService,
    private authService: AuthService

  ) { }


  dataSource: any
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  dataSourceHistorial: any

  ngOnInit() {
    this.getUserData();
    this.getHistorialServicio(null);

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

  ionViewDidEnter() {
    this.getServicio();

  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  getIndicadores() {
    var filtroData: any = new FormData();
    filtroData.append("user_id", this.userData.id);
    console.log(this.userData.id)

    this.servicioService.getIndicadores(filtroData)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          this.dataSource = datos;
          console.log(this.dataSource)
        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  getServicio() {
    var filtroData: any = new FormData();
    filtroData.append("user_id", this.userData.id);
    console.log(this.userData.id)

    this.servicioService.getServicio(filtroData)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          this.dataSource = datos;
          console.log(this.dataSource)
        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  getHistorialServicio(filtroData: any | null | '') {
    var filtroData: any = new FormData();
    filtroData.append("user_id", this.userData.id);
    console.log(this.userData.id)
    this.servicioService.getHistorialServicio(filtroData)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          this.dataSourceHistorial = datos;
          console.log(this.dataSourceHistorial)
        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }





  async showDetalleServicio(id_servicio) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message:
        '<ion-grid>' +
        '<ion-row>' +
        '<ion-col>' +
        '<ion-text>' +
        ' ID VEHICULO: ' + id_servicio +
        '</ion-text>' +
        '</ion-col>' +
        '</ion-row>' +
        '</ion-grid>',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }
}
