import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuloPage } from './modulo.page';

const routes: Routes = [
  {
    path: '',
    component: ModuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuloPageRoutingModule {}
