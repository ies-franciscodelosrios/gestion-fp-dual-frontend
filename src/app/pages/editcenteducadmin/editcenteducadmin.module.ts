import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcenteducadminPageRoutingModule } from './editcenteducadmin-routing.module';

import { EditcenteducadminPage } from './editcenteducadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcenteducadminPageRoutingModule
  ],
  declarations: [EditcenteducadminPage]
})
export class EditcenteducadminPageModule {}
