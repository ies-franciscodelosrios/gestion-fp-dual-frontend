import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CeModuleRaEditPageRoutingModule } from './ce-module-ra-edit-routing.module';
import { CeModuleRaEditPage } from './ce-module-ra-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CeModuleRaEditPageRoutingModule
  ],
  declarations: [CeModuleRaEditPage]
})
export class CeModuleRaEditPageModule {}
