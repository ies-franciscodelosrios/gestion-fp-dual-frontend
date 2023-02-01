import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'empresa',
        loadChildren: () => import('../centroeducativo/empresa/empresa.module').then(m => m.EmpresaPageModule)
      },
      {
        path: 'alumno',
        loadChildren: () => import('../centroeducativo/alumno/alumno.module').then(m => m.AlumnoPageModule)
      },
      {
        path: 'modulo',
        loadChildren: () => import('../centroeducativo/modulo/modulo.module').then(m => m.ModuloPageModule)
      },
      {
        path: 'periodopracticas',
        loadChildren: () => import('../centroeducativo/periodopracticas/periodopracticas.module').then(m => m.PeriodopracticasPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/empresa',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/empresa',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
