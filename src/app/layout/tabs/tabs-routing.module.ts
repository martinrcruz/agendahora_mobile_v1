import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from 'src/app/application/login/login.page';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
{
  path: 'login',
  component: LoginPage
},
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'mis-vehiculos',
        canActivate: [AuthGuard],
        loadChildren: () => import('../../application/mis-vehiculos/mis-vehiculos.module').then(m => m.MisVehiculosPageModule)
      },
      {
        path: 'servicios-activos',
        canActivate: [AuthGuard],
        loadChildren: () => import('../../application/servicios-activos/servicios-activos.module').then(m => m.ServiciosActivosPageModule)
      },
      {
        path: 'agenda',
        canActivate: [AuthGuard],
        loadChildren: () => import('../../application/agenda/agenda.module').then(m => m.AgendaPageModule)
      },
      {
        path: 'mensajeria',
        canActivate: [AuthGuard],
        loadChildren: () => import('../../application/mensajeria/mensajeria.module').then(m => m.MensajeriaPageModule)
      },
      {
        path: 'perfil',
        canActivate: [AuthGuard],
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
