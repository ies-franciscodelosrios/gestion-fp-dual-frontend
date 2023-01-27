import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducativoPageRoutingModule } from './educativo-routing.module';

import { EducativoPage } from './educativo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducativoPageRoutingModule
  ],
  declarations: [EducativoPage]
})
export class EducativoPageModule {}
