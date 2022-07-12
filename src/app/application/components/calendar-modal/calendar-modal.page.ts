import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AgendaService } from 'src/app/services/agenda.service';
import { AuthService } from 'src/app/services/auth.service';
import { MisVehiculosService } from 'src/app/services/mis-vehiculos.service';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.page.html',
  styleUrls: ['./calendar-modal.page.scss'],
})
export class CalendarModalPage implements OnInit {

  // @Output() refreshTable = new EventEmitter<string>();

  @Input() fechaSelected: string;
  @Input() horaSelected: string;
  @Output() refreshCalendar: EventEmitter<string> = new EventEmitter();

  public dateSelected: any;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  dataSource: any;
  viewTitle: string;
  saveResponse: any;
  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true
  }

  userData = {
    id: '',
    username: '',
    group: ''
  };

  modalReady = false;

  constructor(
    private modalCtrl: ModalController,
    private agendaService: AgendaService,
    private authService: AuthService,
    private vehiculoService: MisVehiculosService
  ) { }




  ngOnInit() {
    this.getUserData();
  }


  ionViewDidEnter() {
  }

  ngAfterViewInit() {
    this.getVehiculo();
    setTimeout(() => {
      this.modalReady = true;
    }, 0);
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
          console.log(this.dataSource)
        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }



  // [MODAL FUNCTIONS]
  save() {
    console.log(this.event)
    this.refreshCalendar.emit();
    this.modalCtrl.dismiss({ event: this.event })

  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    console.log('ev:  ', ev)
    this.event.startTime = new Date(ev.selectedTime);
  }

  close() {
    this.modalCtrl.dismiss();
  }


  agendaForm = new FormGroup({
    // id_servicio: new FormControl({ value: 'No aplica', disabled: true }),
    fecha_agenda: new FormControl(),
    hora_agenda: new FormControl(),
    vehiculo: new FormControl(),
    tipo_servicio: new FormControl(),
    observacion: new FormControl(),

  })


  submit(vehiculo, tipo, observacion) {

    console.log(vehiculo.value);
    console.log(tipo.value);
    console.log(observacion.value);


    var fecha_agenda = this.fechaSelected;
    var hora_inicio = this.horaSelected;
    console.log(fecha_agenda + ' ' + hora_inicio)

    var get1 = hora_inicio.substring(0, 1)
    var get2 = hora_inicio.substring(1, 2)
    if (get1 == '0' && get2 == '9') {
      hora_fin = '10:00:00';
    } else {
      var suma = parseInt(get2) + 1;
      get2 = suma.toString()
    }

    var dia = fecha_agenda.substring(0, 2)
    var mes = fecha_agenda.substring(3, 5)
    var ano = fecha_agenda.substring(6, 10)

    var fecha_formated = ano + '-' + mes + '-' + dia
    // var fechaSelected = new Date(fecha_agenda) //la detecta como fecha invalida

    // var fecha_formated = fechaSelected.getFullYear() + '-' + fechaSelected.getDate() + '-' + (fechaSelected.getMonth() + 1)

    var hora_fin = get1 + get2 + ':00:00';

    console.log(hora_fin)

    var agenda_inicio = fecha_formated + ' ' + hora_inicio;
    var agenda_fin = fecha_formated + ' ' + hora_fin;


    var formData: any = new FormData();
    formData.append("observacion", observacion.value);
    formData.append("tipo_servicio", tipo.value);
    formData.append("fecha_agenda", fecha_formated);
    formData.append("agenda_inicio", agenda_inicio);
    formData.append("agenda_fin", agenda_fin);
    formData.append("fecha_entrada", agenda_inicio);
    formData.append("fecha_salida", agenda_fin);
    formData.append("id_cliente", this.userData.id);
    formData.append("id_vehiculo", vehiculo.value);

    this.agendaService.addAgenda(formData)
      .subscribe({
        next: (res) => {
          this.saveResponse = res;
          console.log(this.saveResponse)
          this.save();
        },
        error: (err) => {
          this.saveResponse = err
          alert('error');
        }
      })
  }
}
