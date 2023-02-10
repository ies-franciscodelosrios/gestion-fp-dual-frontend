import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuloListaRaPage } from './modulo-lista-ra.page';

const routes: Routes = [
  {
    path: '',
    component: ModuloListaRaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuloListaRaPageRoutingModule {}
