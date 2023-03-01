import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCEPageRoutingModule } from './add-ce-routing.module';

import { AddCEPage } from './add-ce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddCEPageRoutingModule
  ],
  declarations: [AddCEPage]
})
export class AddCEPageModule {}
