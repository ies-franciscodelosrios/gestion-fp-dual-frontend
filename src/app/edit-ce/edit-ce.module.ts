import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCePageRoutingModule } from './edit-ce-routing.module';

import { EditCePage } from './edit-ce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCePageRoutingModule
  ],
  declarations: [EditCePage]
})
export class EditCePageModule {}
