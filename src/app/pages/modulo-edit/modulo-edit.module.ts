import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModuloEditPageRoutingModule } from './modulo-edit-routing.module';
import { ModuloEditPage } from './modulo-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModuloEditPageRoutingModule
  ],
  declarations: [ModuloEditPage]
})
export class ModuloEditPageModule {}
