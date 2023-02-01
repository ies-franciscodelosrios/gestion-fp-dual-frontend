import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeriodopracticasPage } from './periodopracticas.page';

const routes: Routes = [
  {
    path: '',
    component: PeriodopracticasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodopracticasPageRoutingModule {}
