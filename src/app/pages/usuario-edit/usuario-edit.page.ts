import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonTitle, ModalController, NavParams } from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { LoginService } from '../../services/login.service';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.page.html',
  styleUrls: ['./usuario-edit.page.scss'],
})
export class UsuarioEditPage implements OnInit {
  public usuario: string = "";
  public formUsuario: FormGroup;  //el grupo del formulario reactivo , ojo con importar ReactiveFormModule

  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    navParams: NavParams
  ) {
    this.usuario = navParams.get('Empresa')
  }

  ngOnInit() {
    this.formUsuario = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      correo: '',
      doc: '',
      rol: '',
      alta: true,
    })
  }

  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }


  submitForm() {
    let emp = document.getElementById("Empresa");

    console.log(this.formUsuario.get('nombre')?.value);
    //mostrar un loading....

    if (emp != null) {
      try {
        this.apiS.addUsuario({
          nombre: this.formUsuario.get('nombre')?.value,
          correo: this.formUsuario.get('correo')?.value,
          documentos: this.formUsuario.get('doc')?.value,
          rol: { nombre: "Empresa"},
          alta: this.formUsuario.get('alta')?.value,
        }).subscribe(d => {
          //la respuesta del servidor
          console.log(d);
          //ocultador loading
        })
      } catch (error) {
        console.error(error);
        //ocular loading
      }
    } else {
      try {
        this.apiS.addUsuario({
          nombre: this.formUsuario.get('nombre')?.value,
          correo: this.formUsuario.get('correo')?.value,
          documentos: this.formUsuario.get('doc')?.value,
          rol: { nombre: "Alumno" },
          alta: this.formUsuario.get('alta')?.value,
        }).subscribe(d => {
          //la respuesta del servidor
          console.log(d);
          //ocultador loading
        })
      } catch (error) {
        console.error(error);
        //ocular loading
      }
    }

  }

}
