import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CePage } from './ce.page';

const routes: Routes = [
  {
    path: '',
    component: CePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CePageRoutingModule {}
