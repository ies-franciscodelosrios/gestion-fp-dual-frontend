import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UsuarioEditPageRoutingModule } from './usuario-edit-routing.module';

import { UsuarioEditPage } from './usuario-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UsuarioEditPageRoutingModule
  ],
  declarations: [UsuarioEditPage]
})
export class UsuarioEditPageModule {}
