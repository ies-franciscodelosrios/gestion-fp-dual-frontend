import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TareaEditPageRoutingModule } from './tarea-edit-routing.module';
import { TareaEditPage } from './tarea-edit.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareaEditPageRoutingModule,
    ReactiveFormsModule,
   
  ],
  declarations: [TareaEditPage]
})
export class TareaEditPageModule {}
