import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCEPageRoutingModule } from './edit-ce-routing.module';

import { EditCEPage } from './edit-ce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCEPageRoutingModule
  ],
  declarations: [EditCEPage]
})
export class EditCEPageModule {}
