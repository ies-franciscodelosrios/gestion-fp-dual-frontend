import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcenteducadminPage } from './editcenteducadmin.page';

const routes: Routes = [
  {
    path: '',
    component: EditcenteducadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcenteducadminPageRoutingModule {}
