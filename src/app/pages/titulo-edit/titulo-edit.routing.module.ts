import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TituloEditPage } from './titulo-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TituloEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TituloEditPageRoutingModule {}
