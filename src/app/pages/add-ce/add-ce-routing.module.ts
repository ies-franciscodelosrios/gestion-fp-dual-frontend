import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCEPage } from './add-ce.page';

const routes: Routes = [
  {
    path: '',
    component: AddCEPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCEPageRoutingModule {}
