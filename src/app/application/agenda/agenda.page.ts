import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';
import { AgendaService } from 'src/app/services/agenda.service';
import { CalendarComponent, NgCalendarModule } from 'ionic2-calendar';
import { CalendarModalPage } from '../components/calendar-modal/calendar-modal.page';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})


export class AgendaPage implements OnInit {
  saveResponse: any;
  dateSelected: any;
  timeSelected: any;
 
  horasDisponibles: any;
  eventAvailable: any;
  eventColor: any;
  trigger = false;
  eventSource = [];
  viewTitle: string;
  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true
  }

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;


  constructor(
    private agendaService: AgendaService,
    private modalCtrl: ModalController
  ) {
  }


  ngOnInit() {
  }


  ngAfterViewInit() {
    this.getCalendario();

  }


  ionViewWillEnter() {

  }


  // [CALENDAR FUNCTIONS]
  next() {
    this.trigger = false;
    this.myCal.slideNext();

  }

  prev() {
    this.trigger = false;
    this.myCal.slidePrev();

  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
    this.trigger = false;

  }

  onSelect(fecha, hora) {
    let fechaSelected = new Date(fecha.selectedTime)
    this.dateSelected = ('0' + (fechaSelected.getDate())).slice(-2) + '-' + ('0' + (fechaSelected.getMonth() + 1)).slice(-2) + '-' + fechaSelected.getFullYear();
    let horaSelected = hora
    this.timeSelected = this.dateSelected + ' ' + horaSelected
    this.checkAvailableHours(fecha.selectedTime);
    if (this.trigger) {
      this.addHora(fecha.selectedTime, horaSelected);
    }
    // this.event.startTime = new Date(selected.selectedTime);
    this.trigger = false;
  }


  async addHora(fecha, hora) {
    let fechaSelected = new Date(fecha.date)
    this.dateSelected = ('0' + (fechaSelected.getDate())).slice(-2) + '-' + ('0' + (fechaSelected.getMonth() + 1)).slice(-2) + '-' + fechaSelected.getFullYear();

    const modal = await this.modalCtrl.create({
      component: CalendarModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false,
      componentProps: {
        'fechaSelected': this.dateSelected,
        'horaSelected': hora,
      }
    });
    modal.onDidDismiss().then(data => {
      this.getCalendario();
    });
    await modal.present();

  }




  // [ADD AGENDA]
  // async openAddAgenda() {
  //   const modal = await this.modalCtrl.create({
  //     component: CalendarModalPage,
  //     cssClass: 'cal-modal',
  //     backdropDismiss: false
  //   });

  //   await modal.present();

  //   modal.onDidDismiss().then((result) => {
  //     if (result.data && result.data.event) {
  //       let event = result.data.event;
  //       if (event.allDay) {
  //         let start = event.startTime;
  //         event.startTime = new Date(
  //           Date.UTC(
  //             start.getUTCFullYear(),
  //             start.getUTCMonth(),
  //             start.getUTCDate()
  //           )
  //         );
  //         event.endTime = new Date(
  //           Date.UTC(
  //             start.getUTCFullYear(),
  //             start.getUTCMonth(),
  //             start.getUTCDate() + 1
  //           )
  //         );
  //       }
  //       this.eventSource.push(result.data.event);
  //       this.myCal.loadEvents();
  //     }
  //   })
  // }




  getCalendario() {
    this.agendaService.getAgenda()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          for (let i = 0; i < datos.length; i++) {
            var startTime = new Date(datos[i].agenda_inicio)
            var endTime = new Date(datos[i].agenda_fin);
            this.eventSource.push({
              title: datos[i].title,
              startTime: startTime,
              endTime: endTime,
              allDay: false,
              eventColor: 'black'
            })
          }
          this.myCal.loadEvents()

        },
        error: (err: any) => {
          alert('Error fetching')
        }
      })
  }




  //[DECLARACION DE HORAS]
  hora08: any;
  hora09: any;
  hora10: any;
  hora11: any;
  hora12: any;
  hora13: any;
  hora14: any;
  hora15: any;
  hora16: any;
  hora17: any;
  //[DECLARACION DE HORAS]


  checkAvailableHours(fecha: any) {
    var fechaSelected = new Date(fecha)
    var date = fechaSelected.getFullYear() + '-' + ('0' + (fechaSelected.getMonth() + 1)).slice(-2) + '-' + ('0' + (fechaSelected.getDate())).slice(-2);

    this.agendaService.getHorasDisponibles(date)
      .subscribe({
        next: (res) => {
          console.log(res);
          var newData = Object.entries(res)
          this.horasDisponibles = (newData[1][1])
          this.hora08 = this.horasDisponibles[0];
          this.hora09 = this.horasDisponibles[1];
          this.hora10 = this.horasDisponibles[2];
          this.hora11 = this.horasDisponibles[3];
          this.hora12 = this.horasDisponibles[4];
          this.hora13 = this.horasDisponibles[5];
          this.hora14 = this.horasDisponibles[6];
          this.hora15 = this.horasDisponibles[7];
          this.hora16 = this.horasDisponibles[8];
          this.hora17 = this.horasDisponibles[9];

          if (
            this.hora08 == 1 &&
            this.hora09 == 1 &&
            this.hora10 == 1 &&
            this.hora11 == 1 &&
            this.hora12 == 1 &&
            this.hora13 == 1 &&
            this.hora14 == 1 &&
            this.hora15 == 1 &&
            this.hora16 == 1 &&
            this.hora17 == 1
          ) {
            this.eventAvailable = '2';
            this.eventColor = 'red';
          }
          if (
            this.hora08 == 1 ||
            this.hora09 == 1 ||
            this.hora10 == 1 ||
            this.hora11 == 1 ||
            this.hora12 == 1 ||
            this.hora13 == 1 ||
            this.hora14 == 1 ||
            this.hora15 == 1 ||
            this.hora16 == 1 ||
            this.hora17 == 1
          ) {
            this.eventAvailable = '1';
            this.eventColor = 'yellow';
          }
          if (
            this.hora08 == 0 &&
            this.hora09 == 0 &&
            this.hora10 == 0 &&
            this.hora11 == 0 &&
            this.hora12 == 0 &&
            this.hora13 == 0 &&
            this.hora14 == 0 &&
            this.hora15 == 0 &&
            this.hora16 == 0 &&
            this.hora17 == 0) {
            this.eventAvailable = '0';
            this.eventColor = 'green';
          }

        },
        error: (err: any) => {
          alert('Error fetching')
        }
      })
  }

}


