import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiciosActivosPage } from './servicios-activos.page';

const routes: Routes = [
  {
    path: '',
    component: ServiciosActivosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosActivosPageRoutingModule {}
