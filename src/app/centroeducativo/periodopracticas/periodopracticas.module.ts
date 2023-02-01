import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeriodopracticasPageRoutingModule } from './periodopracticas-routing.module';

import { PeriodopracticasPage } from './periodopracticas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeriodopracticasPageRoutingModule
  ],
  declarations: [PeriodopracticasPage]
})
export class PeriodopracticasPageModule {}
