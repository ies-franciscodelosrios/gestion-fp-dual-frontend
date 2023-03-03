import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TituloEditPage } from './titulo-edit.page';
import { TituloEditPageRoutingModule } from './titulo-edit.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TituloEditPageRoutingModule
  ],
  declarations: [TituloEditPage]
})
export class TituloEditPageModule {}
