import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CeTitleEditPageRoutingModule } from './ce-title-edit-routing.module';
import { CeTitleEditPage } from './ce-title-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CeTitleEditPageRoutingModule
  ],
  declarations: [CeTitleEditPage]
})
export class CeTitleEditPageModule {}
