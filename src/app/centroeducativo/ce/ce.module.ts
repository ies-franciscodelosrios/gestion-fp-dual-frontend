import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CePageRoutingModule } from './ce-routing.module';

import { CePage } from './ce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CePageRoutingModule
  ],
  declarations: [CePage]
})
export class CePageModule {}
