import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { modalController } from '@ionic/core';

@Component({
  selector: 'app-mis-vehiculos',
  templateUrl: './mis-vehiculos.page.html',
  styleUrls: ['./mis-vehiculos.page.scss'],
})
export class MisVehiculosPage implements OnInit {

  constructor(private modalController: ModalController) { }


  ngOnInit() {
  }

  





  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}