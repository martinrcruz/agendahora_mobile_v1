import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./layout/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'mis-vehiculos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./application/mis-vehiculos/mis-vehiculos.module').then( m => m.MisVehiculosPageModule)
  },
  {
    path: 'servicios-activos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./application/servicios-activos/servicios-activos.module').then( m => m.ServiciosActivosPageModule)
  },
  {
    path: 'agenda',
    canActivate: [AuthGuard],
    loadChildren: () => import('./application/agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'historial',
    canActivate: [AuthGuard],
    loadChildren: () => import('./application/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'mensajeria',
    canActivate: [AuthGuard],
    loadChildren: () => import('./application/mensajeria/mensajeria.module').then( m => m.MensajeriaPageModule)
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard],
    loadChildren: () => import('./application/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'calendar-modal',
    canActivate: [AuthGuard],
    loadChildren: () => import('./application/components/calendar-modal/calendar-modal.module').then( m => m.CalendarModalPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./application/login/login.module').then( m => m.LoginPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
