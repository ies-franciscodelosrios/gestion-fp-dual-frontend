import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CEUserEditPage } from './ce-user-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CEUserEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CEUserEditPageRoutingModule {}
