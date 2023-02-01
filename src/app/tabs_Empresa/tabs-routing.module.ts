import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'alumnos',
        loadChildren: () => import('../empresa/alumnos/alumnos.module').then(m => m.AlumnosPageModule)
      },
      {
        path: 'tareas',
        loadChildren: () => import('../empresa/tareas/tareas.module').then(m => m.TareasPageModule)
      },
      {
        path: '',
        redirectTo: '/empresa/alumnos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/empresa/alumnos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
