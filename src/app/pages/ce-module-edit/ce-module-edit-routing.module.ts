import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeModuleEditPage } from './ce-module-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CeModuleEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeModuleEditPageRoutingModule {}
