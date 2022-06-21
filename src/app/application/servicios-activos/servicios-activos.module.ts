import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosActivosPageRoutingModule } from './servicios-activos-routing.module';

import { ServiciosActivosPage } from './servicios-activos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosActivosPageRoutingModule
  ],
  declarations: [ServiciosActivosPage]
})
export class ServiciosActivosPageModule {}
