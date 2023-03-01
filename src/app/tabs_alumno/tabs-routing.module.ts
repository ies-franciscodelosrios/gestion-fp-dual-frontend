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
        path: '',
        redirectTo: '/alumnos/tareas',
        pathMatch: 'full'
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
