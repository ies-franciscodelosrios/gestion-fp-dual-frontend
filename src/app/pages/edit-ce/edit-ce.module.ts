import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCEPageRoutingModule } from './edit-ce-routing.module';

import { EditCEPage } from './edit-ce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditCEPageRoutingModule
  ],
  declarations: [EditCEPage]
})
export class EditCEPageModule {}
