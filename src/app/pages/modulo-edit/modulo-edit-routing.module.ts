import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuloEditPage } from './modulo-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ModuloEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuloEditPageRoutingModule {}
