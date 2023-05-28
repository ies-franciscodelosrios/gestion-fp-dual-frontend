import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TituloPageRoutingModule } from './titulo-routing.module';
import { TituloPage } from './titulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TituloPageRoutingModule
  ],
  declarations: [TituloPage]
})
export class TituloPageModule {}
