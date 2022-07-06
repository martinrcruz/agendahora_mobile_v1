import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModalPage } from 'src/app/application/components/calendar-modal/calendar-modal.page';
import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TabsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TabsPage, CalendarModalPage]
})
export class TabsPageModule {}
