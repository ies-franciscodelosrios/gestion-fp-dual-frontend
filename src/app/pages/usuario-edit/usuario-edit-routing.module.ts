import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioEditPage } from './usuario-edit.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioEditPageRoutingModule {}
