import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCEPage } from './edit-ce.page';

const routes: Routes = [
  {
    path: '',
    component: EditCEPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCEPageRoutingModule {}
