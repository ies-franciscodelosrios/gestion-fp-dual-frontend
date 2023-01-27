import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminPageModule)
      },
      {
        path: 'educativo',
        loadChildren: () => import('../educativo/educativo.module').then(m => m.EducativoPageModule)
      },
      {
        path: 'empresa',
        loadChildren: () => import('../empresa/empresa.module').then(m => m.EmpresaPageModule)
      },
      {
        path: 'alumno',
        loadChildren: () => import('../alumno/alumno.module').then(m => m.AlumnoPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/admin',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/admin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
