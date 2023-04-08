import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CeTitleEditPage } from './ce-title-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CeTitleEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeTitleEditPageRoutingModule {}
