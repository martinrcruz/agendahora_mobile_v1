import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { MisVehiculosService } from 'src/app/services/mis-vehiculos.service';
import { AlertController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mis-vehiculos',
  templateUrl: './mis-vehiculos.page.html',
  styleUrls: ['./mis-vehiculos.page.scss'],
})
export class MisVehiculosPage implements OnInit {

  @ViewChild('barChart') barChart;
  @Input() user_id: any;

  bars: any;
  colorArray: any;
  constructor(
    private modalController: ModalController,
    private vehiculoService: MisVehiculosService,
    public alertController: AlertController,
    private authService: AuthService
  ) { }

  userData = {
    id: 2,
    username: '',
    group: ''
  };
  dataSource: any
  dataSourceHistorial: any
  selectorMarcaData: any
  selectorVersionData: any
  selectorModeloData: any
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  historialVehiculo = {
    id_solicitud_vehiculo: '',
    marca: '',
    modelo: '',
    version: '',
    ano_compra: '',
    sucursal: '',
    nro_chasis: '',
    nro_motor: '',
    estado: ''
  }

  ngOnInit() {
    console.log(this.user_id)
    this.getSelectorMarca();
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

  ionViewDidEnter() {
    this.getUserData();
    this.graficoLinea();
    this.getVehiculo();
    this.getHistorialSolicitud();
  }

  graficoLinea() {
    if (this.bars) {
      this.bars.destroy();
    }
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Constancia de mantenciones',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }

    });
  }

  async showDetalleSolicitud(id_historial_vehiculo) {

    var formData: any = new FormData();
    formData.append("id_historial_vehiculo", id_historial_vehiculo);

    this.vehiculoService.getHistorialSolicitudById(id_historial_vehiculo)
      .subscribe({
        next: (res) => {
          console.log(res['data'][0])
          var newData = res['data'][0]

          this.historialVehiculo.id_solicitud_vehiculo = newData['id_solicitud_vehiculo'];
          this.historialVehiculo.marca = newData['marca']
          this.historialVehiculo.modelo = newData['modelo']
          this.historialVehiculo.version = newData['version']
          this.historialVehiculo.ano_compra = newData['ano_compra']
          this.historialVehiculo.nro_chasis = newData['nro_chasis']
          this.historialVehiculo.nro_motor = newData['nro_motor']

          this.showModal()
          console.log(newData)

        },
        error: (err) => {
          console.log(err)
        }
      })



  }


  async showModal() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Detalle de solicitud',
      message:
        '<ion-grid>' +
        '<ion-row>' +
        '<ion-col>' +
        '<ion-text>' +
        ' ID SOLICITUD VEHICULO : ' + this.historialVehiculo.id_solicitud_vehiculo + ' <br>' +
        ' MARCA : ' + this.historialVehiculo.marca + ' <br>' +
        ' MODELO : ' + this.historialVehiculo.modelo + ' <br>' +
        ' VERSION : ' + this.historialVehiculo.version + ' <br>' +
        ' ANO COMPRA : ' + this.historialVehiculo.ano_compra + ' <br>' +
        ' NRO CHASIS : ' + this.historialVehiculo.nro_chasis + ' <br>' +
        ' NRO MOTOR : ' + this.historialVehiculo.nro_motor + ' <br>' +
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



  async showInformacion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Informacion sobre este modulo',
      message:
        '<ion-grid>' +
        '<ion-row>' +
        '<ion-col>' +
        '<ion-text>' +
        ' ID SOLICITUD VEHICULO : ' + this.historialVehiculo.id_solicitud_vehiculo + ' <br>' +
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




  getVehiculo() {

    var formData: any = new FormData();
    formData.append("user_id", this.userData.id);
    console.log(this.userData.id)


    this.vehiculoService.getVehiculo(formData)
      .subscribe({
        next: (res) => {
          // console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          this.dataSource = datos;
          // console.log(this.dataSource)
        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  vehiculoForm = new FormGroup({
    id_vehiculo: new FormControl({ value: 'No aplica', disabled: true }),
    nombre: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
    patente: new FormControl('', Validators.required),
    ano_compra: new FormControl('', Validators.required),
    sucursal: new FormControl('', Validators.required),
    nro_chasis: new FormControl('', Validators.required),
    nro_motor: new FormControl('', Validators.required),

  })

  addVehiculo() {
    var formData: any = new FormData();
    formData.append("nombre", this.vehiculoForm.get("nombre")?.value);
    formData.append("marca", this.vehiculoForm.get("marca")?.value);
    formData.append("modelo", this.vehiculoForm.get("modelo")?.value);
    formData.append("version", this.vehiculoForm.get("version")?.value);
    formData.append("patente", this.vehiculoForm.get("patente")?.value);
    formData.append("ano_compra", this.vehiculoForm.get("ano_compra")?.value);
    formData.append("nro_chasis", this.vehiculoForm.get("nro_chasis")?.value);
    formData.append("nro_motor", this.vehiculoForm.get("nro_motor")?.value);

    //PROPIEDADES QUE AGREGAR
    formData.append("sucursal", 1);
    formData.append("id_cliente", 1);
    formData.append("color", "#000");

    this.vehiculoService.addSolicitudVehiculo(formData)
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.saveResponse = res;

          this.showSuccess();
          this.dismiss();
          this.getHistorialSolicitud();

        },
        error: (err) => {
          // console.log(this.vehiculoForm.getRawValue())
          this.saveResponse = err
        }
      })


  }


  async showSuccess() {
    var variable = 1;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Solicitud con exito',
      message: 'Tu solicitud fue ingresada con exito.',
      buttons: ['Aceptar']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  getHistorialSolicitud() {
    var user_id: any = new FormData();
    user_id.append("user_id", this.userData.id);
    console.log(this.userData.id)
    this.vehiculoService.getHistorialSolicitud(user_id)
      .subscribe({
        next: (res) => {
          // console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          console.log(datos);
          this.dataSourceHistorial = datos;
        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  getSelectorMarca() {
    this.vehiculoService.getMarcasVehiculo()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const selectorMarcaData = (newData[1][1])
          // console.log(selectorMarcaData)
          this.selectorMarcaData = selectorMarcaData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  changeMarca(event: any) {
    this.getSelectorModelo(event.target.value);
  }

  getSelectorModelo(id: any) {

    this.vehiculoService.getModelosVehiculo(id)
      .subscribe({
        next: (res) => {
          // console.log(res);
          var newData = Object.entries(res)
          const selectorModeloData = (newData[1][1])
          // console.log(selectorModeloData)
          this.selectorModeloData = selectorModeloData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  changeVersion(event: any) {
    this.getSelectorVersion(event.target.value);
  }

  getSelectorVersion(id: any) {

    this.vehiculoService.getVersionVehiculo(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          var newData = Object.entries(res)
          const selectorVersionData = (newData[1][1])
          // console.log(selectorVersionData)
          this.selectorVersionData = selectorVersionData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}