import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser'
import { IonicModule } from '@ionic/angular';
import { CalendarModalPageRoutingModule } from './calendar-modal-routing.module';
import { CalendarModalPage } from './calendar-modal.page';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModalPageRoutingModule,
    ReactiveFormsModule,
    FormGroup,
    HttpClientModule,
    BrowserModule,
    NgCalendarModule,
  ],
  declarations: [CalendarModalPage]
})
export class CalendarModalPageModule {}
