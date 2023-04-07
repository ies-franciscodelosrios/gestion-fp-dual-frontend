import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeModuleRaEditPage } from './ce-module-ra-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CeModuleRaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeModuleRaEditPageRoutingModule {}
