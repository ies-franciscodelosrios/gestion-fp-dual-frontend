import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CePracticesEditPage } from './ce-practices-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CePracticesEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CePracticesEditPageRoutingModule {}
