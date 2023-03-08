import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaPage } from './ra.page';

const routes: Routes = [
  {
    path: '',
    component: RaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaPageRoutingModule {}
