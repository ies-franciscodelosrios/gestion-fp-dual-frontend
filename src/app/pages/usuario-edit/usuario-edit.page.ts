import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ModalController, NavParams } from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.page.html',
  styleUrls: ['./usuario-edit.page.scss'],
})
export class UsuarioEditPage implements OnInit {
  public tname: string = "";
  @Input('atribuser') atribuser: Usuario;
  public putUsuario: FormGroup;  //el grupo del formulario reactivo , ojo con importar ReactiveFormModule

  @Input('mode') mode: string;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    navParams: NavParams
  ) {
    this.tname = navParams.get('Empresa')
  }

  ngOnInit() {
    if (this.mode == "create") {
      this.putUsuario = this.formBuilder.group({ //creando los campos que serán controlados y validados por putUsuario
        nombre: ['', [Validators.required, Validators.minLength(4)]],
        correo: '',
        documentos: '',
        rol: '',
        alta: true,
      }) 
    } else if (this.mode == "edit"){
        this.apiS.GetMailUsuario(<string>this.atribuser.correo).subscribe(elem => {
        this.atribuser = <Usuario>elem;
        return this.atribuser
      })
      this.putUsuario = this.formBuilder.group({   
        nombre: [this.atribuser.nombre, [Validators.required, Validators.minLength(4)]],
        correo: [this.atribuser.correo],
        documentos: [this.atribuser?.documentos],
        rol: [this.atribuser.id_rol],
        alta: [this.atribuser.alta],
      })
      console.log(this.putUsuario)
    }
  }

  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }

  submitForm() {
    let emp = document.getElementById("Empresa");
    console.log(this.putUsuario.get('nombre')?.value);
    //mostrar un loading....
    if (emp != null) {
      try {
        this.apiS.addUsuario({
          nombre: this.putUsuario.get('nombre')?.value,
          correo: this.putUsuario.get('correo')?.value,
          documentos: this.putUsuario.get('documentos')?.value,
          rol: { nombre: "Empresa"},
          alta: this.putUsuario.get('alta')?.value,
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
          nombre: this.putUsuario.get('nombre')?.value,
          correo: this.putUsuario.get('correo')?.value,
          documentos: this.putUsuario.get('documentos')?.value,
          rol: { nombre: "Alumno" },
          alta: this.putUsuario.get('alta')?.value,
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
