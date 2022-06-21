import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [

  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'mis-vehiculos',
        loadChildren: () => import('../../application/mis-vehiculos/mis-vehiculos.module').then(m => m.MisVehiculosPageModule)
      },
      {
        path: 'servicios-activos',
        loadChildren: () => import('../../application/servicios-activos/servicios-activos.module').then(m => m.ServiciosActivosPageModule)
      },
      {
        path: 'agenda',
        loadChildren: () => import('../../application/agenda/agenda.module').then(m => m.AgendaPageModule)
      },
      {
        path: 'mensajeria',
        loadChildren: () => import('../../application/mensajeria/mensajeria.module').then(m => m.MensajeriaPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../../application/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/mis-vehiculos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/mis-vehiculos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
