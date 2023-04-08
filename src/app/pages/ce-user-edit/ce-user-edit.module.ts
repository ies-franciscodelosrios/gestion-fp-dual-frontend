import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CEUserEditPageRoutingModule } from './ce-user-edit-routing.module';
import { CEUserEditPage } from './ce-user-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CEUserEditPageRoutingModule
  ],
  declarations: [CEUserEditPage]
})
export class CEUserEditPageModule {}
