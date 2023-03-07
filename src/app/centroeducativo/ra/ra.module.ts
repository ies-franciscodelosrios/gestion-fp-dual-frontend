import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaPageRoutingModule } from './ra-routing.module';

import { RaPage } from './ra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaPageRoutingModule
  ],
  declarations: [RaPage]
})
export class RaPageModule {}
