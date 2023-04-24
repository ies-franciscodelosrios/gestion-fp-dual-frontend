import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CeModuleEditPageRoutingModule } from './ce-module-edit-routing.module';
import { CeModuleEditPage } from './ce-module-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CeModuleEditPageRoutingModule
  ],
  declarations: [CeModuleEditPage]
})
export class CeModuleEditPageModule {}
