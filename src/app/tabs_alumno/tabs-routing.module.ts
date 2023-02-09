import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tareas',
        loadChildren: () => import('../alumno/tareas/tareas.module').then(m => m.TareasPageModule)
      },
      {
        path: 'diario',
        loadChildren: () => import('../alumno/diario/diario.module').then(m => m.DiarioPageModule)
      },
      {
        path: '',
        redirectTo: '/tareas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tareas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
