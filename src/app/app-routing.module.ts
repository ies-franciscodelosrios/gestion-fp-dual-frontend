import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuardAdmin } from './guards/auth.guardAdmin';
import { AuthGuardAlumno } from './guards/auth.guardAlumno';
import { AuthGuardCE } from './guards/auth.guardCE';
import { AuthGuardEmpresa } from './guards/auth.guardEmpresa';
import { Error404Page } from './pages/error404/error404.page';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'centroeducativo',
    loadChildren: () => import('./tabs_centrosEducativo/tabs.module').then(m => m.TabsPageModule),
    canActivate:[AuthGuard,AuthGuardCE]
  }, //para hacer pruebas
  {
    path: 'empresa',
    loadChildren: () => import('./tabs_Empresa/tabs.module').then(m => m.TabsPageModule),
    canActivate:[AuthGuard,AuthGuardEmpresa]
  }, //para hacer pruebas
  {
    path: 'editar_usuario',
    loadChildren: () => import('./pages/usuario-edit/usuario-edit.module').then( m => m.UsuarioEditPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
    canActivate:[AuthGuard,AuthGuardAdmin]
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./tabs_alumno/tabs.module').then( m => m.TabsAlumnoModule),
    canActivate:[AuthGuard,AuthGuardAlumno]
  },
  {
    path: 'error404',
    loadChildren: () => import('./pages/error404/error404.module').then( m => m.Error404PageModule)
  },
  { path: '**', pathMatch: 'full', 
  component: Error404Page },
  {
    path: 'form',
    loadChildren: () => import('./pages/form/form.module').then( m => m.FormPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
