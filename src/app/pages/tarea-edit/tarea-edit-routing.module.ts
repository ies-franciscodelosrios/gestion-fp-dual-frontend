import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareaEditPage } from './tarea-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TareaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareaEditPageRoutingModule {}
