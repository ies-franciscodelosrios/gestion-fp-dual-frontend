import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuardAdmin } from './guards/auth.guardAdmin';
import { AuthGuardAlumno } from './guards/auth.guardAlumno';
import { AuthGuardCE } from './guards/auth.guardCE';
import { AuthGuardEmpresa } from './guards/auth.guardEmpresa';
import { LoginPage } from './pages/login/login.page';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'centroeducativo',
    loadChildren: () => import('./tabs_centrosEducativo/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard, AuthGuardCE]
  }, //para hacer pruebas
  {
    path: 'empresa',
    loadChildren: () => import('./tabs_Empresa/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard, AuthGuardEmpresa]
  }, //para hacer pruebas
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [AuthGuard, AuthGuardAdmin]
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./tabs_alumno/tabs.module').then(m => m.TabsAlumnoModule),
    canActivate: [AuthGuard, AuthGuardAlumno]
  },
  {
    path: 'error404',
    loadChildren: () => import('./pages/error404/error404.module').then(m => m.Error404PageModule)
  },
  {
    path: 'titulo',
    loadChildren: () => import('./centroeducativo/titulo/titulo.module').then( m => m.TituloPageModule)
  },
  {
    path: 'modulo/:nombre',
    loadChildren: () => import('./centroeducativo/modulo/modulo.module').then( m => m.ModuloPageModule)
  },
  {
    path: 'ra/:nombre',
    loadChildren: () => import('./centroeducativo/ra/ra.module').then( m => m.RaPageModule)
  },
  { path: '**', pathMatch: 'full', 
  component: LoginPage },
  {
    path: 'edit-ce',
    loadChildren: () => import('./pages/edit-ce/edit-ce.module').then( m => m.EditCEPageModule)
  },
  {
    path: 'add-ce',
    loadChildren: () => import('./pages/add-ce/add-ce.module').then( m => m.AddCEPageModule)
  },
  {
    path: 'new-task',
    loadChildren: () => import('./pages/new-task/new-task.module').then( m => m.NewTaskPageModule)
  },
  {
    path: 'edit-task',
    loadChildren: () => import('./pages/edit-task/edit-task.module').then( m => m.EditTaskPageModule)
  },
  {
    path: 'info-alumno',
    loadChildren: () => import('./pages/info-alumno/info-alumno.module').then( m => m.InfoAlumnoPageModule)
  },
  {
    path: 'ce-user-edit',
    loadChildren: () => import('./pages/ce-user-edit/ce-user-edit.module').then( m => m.CEUserEditPageModule)
  },
  {
    path: 'ce-title-edit',
    loadChildren: () => import('./pages/ce-title-edit/ce-title-edit.module').then( m => m.CeTitleEditPageModule)
  },
  {
    path: 'ce-practices-edit',
    loadChildren: () => import('./pages/ce-practices-edit/ce-practices-edit.module').then( m => m.CePracticesEditPageModule)
  },
  {
    path: 'ce-module-edit',
    loadChildren: () => import('./pages/ce-module-edit/ce-module-edit.module').then( m => m.CeModuleEditPageModule)
  },
  {
    path: 'ce-module-ra-edit',
    loadChildren: () => import('./pages/ce-module-ra-edit/ce-module-ra-edit.module').then( m => m.CeModuleRaEditPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },






];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
