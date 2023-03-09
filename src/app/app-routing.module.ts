import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuardAdmin } from './guards/auth.guardAdmin';
import { AuthGuardAlumno } from './guards/auth.guardAlumno';
import { AuthGuardCE } from './guards/auth.guardCE';
import { AuthGuardEmpresa } from './guards/auth.guardEmpresa';
import { TabsAlumnoModule } from './tabs_alumno/tabs.module';
import { Error404Page } from './pages/error404/error404.page';
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
    path: 'editar_usuario',
    loadChildren: () => import('./pages/usuario-edit/usuario-edit.module').then(m => m.UsuarioEditPageModule)
  },
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
    path: 'modulo-lista-ra',
    loadChildren: () => import('./pages/modulo-lista-ra/modulo-lista-ra.module').then(m => m.ModuloListaRaPageModule)
  },
  {
    path: 'modulo-edit',
    loadChildren: () => import('./pages/modulo-edit/modulo-edit.module').then( m => m.ModuloEditPageModule)
  },
  {
    path: 'titulo',
    loadChildren: () => import('./centroeducativo/titulo/titulo.module').then( m => m.TituloPageModule)
  },
  {
    path: 'titulo-edit',
    loadChildren: () => import('./pages/titulo-edit/titulo-edit.module').then( m => m.TituloEditPageModule)
  },
  {
    path: 'practicas',
    loadChildren: () => import('./pages/practicas/practicas.module').then( m => m.PracticasPageModule)
  },
  { path: '**', pathMatch: 'full', 
  component: LoginPage },
  {
    path: 'edit-ce',
    loadChildren: () => import('./pages/edit-ce/edit-ce.module').then( m => m.EditCePageModule)
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
    path: 'ra',
    loadChildren: () => import('./centroeducativo/ra/ra.module').then( m => m.RaPageModule)
  },
  {
    path: 'info-alumno',
    loadChildren: () => import('./pages/info-alumno/info-alumno.module').then( m => m.InfoAlumnoPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
