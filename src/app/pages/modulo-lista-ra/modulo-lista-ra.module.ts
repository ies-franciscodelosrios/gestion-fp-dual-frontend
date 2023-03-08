import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuloListaRaPageRoutingModule } from './modulo-lista-ra-routing.module';

import { ModuloListaRaPage } from './modulo-lista-ra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModuloListaRaPageRoutingModule
  ],
  declarations: [ModuloListaRaPage]
})
export class ModuloListaRaPageModule {}
