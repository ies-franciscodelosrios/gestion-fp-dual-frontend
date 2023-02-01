import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuloPageRoutingModule } from './modulo-routing.module';

import { ModuloPage } from './modulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModuloPageRoutingModule
  ],
  declarations: [ModuloPage]
})
export class ModuloPageModule {}
