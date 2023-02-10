import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PracticasPage } from './practicas.page';

const routes: Routes = [
  {
    path: '',
    component: PracticasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticasPageRoutingModule {}
