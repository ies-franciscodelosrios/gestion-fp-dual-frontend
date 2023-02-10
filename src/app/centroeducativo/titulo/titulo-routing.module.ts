import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TituloPage } from './titulo.page';

const routes: Routes = [
  {
    path: '',
    component: TituloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TituloPageRoutingModule {}
