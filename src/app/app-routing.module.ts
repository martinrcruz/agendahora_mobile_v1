import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'mis-vehiculos',
    loadChildren: () => import('./application/mis-vehiculos/mis-vehiculos.module').then( m => m.MisVehiculosPageModule)
  },
  {
    path: 'servicios-activos',
    loadChildren: () => import('./application/servicios-activos/servicios-activos.module').then( m => m.ServiciosActivosPageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./application/agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./application/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'mensajeria',
    loadChildren: () => import('./application/mensajeria/mensajeria.module').then( m => m.MensajeriaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./application/perfil/perfil.module').then( m => m.PerfilPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
