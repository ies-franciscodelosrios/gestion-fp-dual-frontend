import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.page.html',
  styleUrls: ['./usuario-edit.page.scss'],
})
export class UsuarioEditPage implements OnInit {

  @Input('user') user:Usuario;
  public todo: FormGroup ;
  constructor(
    private formBuilder:FormBuilder,
    private loginS:LoginService,
    private modalCTRL:ModalController
  ) {
  }
  ngOnInit() {
    if(!this.user){
      console.log("Crear Usuario");
    } else{
      this.todo = this.formBuilder.group({
        nombre :[this.user.nombre],
        correo : [this.user.correo],
        doc : [this.user.doc],
        alta : [this.user.alta],
      })
    }
  }

}
