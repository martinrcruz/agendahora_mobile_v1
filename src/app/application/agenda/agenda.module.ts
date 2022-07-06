import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgendaPageRoutingModule } from './agenda-routing.module';
import { AgendaPage } from './agenda.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es-CL';
registerLocaleData(localeEs);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [AgendaPage],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-CL'}
  ]
})
export class AgendaPageModule { }
