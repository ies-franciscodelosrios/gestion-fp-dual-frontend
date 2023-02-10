import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCePage } from './edit-ce.page';

const routes: Routes = [
  {
    path: '',
    component: EditCePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCePageRoutingModule {}
