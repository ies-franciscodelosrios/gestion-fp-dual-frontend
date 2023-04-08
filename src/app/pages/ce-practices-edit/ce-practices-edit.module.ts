import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CePracticesEditPageRoutingModule } from './ce-practices-edit-routing.module';
import { CePracticesEditPage } from './ce-practices-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CePracticesEditPageRoutingModule
  ],
  declarations: [CePracticesEditPage]
})
export class CePracticesEditPageModule {}
