import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.page.html',
  styleUrls: ['./usuario-edit.page.scss'],
})
export class UsuarioEditPage implements OnInit {
  @Input('atribuser') atribuser: Usuario;
  public formUsuario: FormGroup;  //el grupo del formulario reactivo , ojo con importar ReactiveFormModule
  
  @Input('mode') mode: string;
  @Output() usrUpdate: EventEmitter<boolean>=new EventEmitter<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    navParams: NavParams
  ) {
  }

  async ngOnInit() {
    if (this.mode == "create") {
      this.formUsuario = this.formBuilder.group({ //creando los campos que serán controlados y validados por putUsuario
        nombre: ['', [Validators.required, Validators.minLength(4)]],
        correo: '',
        documentos: '',
        rol: '',
        alta: true,
      })
    } else if (this.mode == "edit") {
      //this.atribuser = await lastValueFrom(this.apiS.GetMailUsuario(<string>this.atribuser.correo));   
      this.formUsuario =  this.formBuilder.group({
        nombre: [this.atribuser.nombre, [Validators.required, Validators.minLength(4)]],
        correo: [this.atribuser.correo],
        documentos: [this.atribuser.documentos],
        rol: [this.atribuser.id_rol],
        alta: [this.atribuser.alta],
      })
    }
  }

  cancel() {
    this.usrUpdate.emit(true);
    this.modalCTRL.dismiss(null, 'cancel');
  }

  submitForm() {
    let emp = document.getElementById("Empresa");
    //mostrar un loading....
    if (this.mode == "create") {
      if (emp != null) {
        try {
          this.apiS.addUsuario({
            nombre: this.formUsuario.get('nombre')?.value,
            correo: this.formUsuario.get('correo')?.value,
            documentos: this.formUsuario.get('documentos')?.value,
            rol: { nombre: "Empresa" },
            alta: this.formUsuario.get('alta')?.value,
          }).subscribe(d => {
            //la respuesta del servidor
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
            documentos: this.formUsuario.get('documentos')?.value,
            rol: { nombre: "Alumno" },
            alta: this.formUsuario.get('alta')?.value,
          }).subscribe(d => {
            //la respuesta del servidor
            //ocultador loading
          })
        } catch (error) {
          console.error(error);
          //ocular loading
        }
      }
      
      this.cancel();
    } else {
      if (emp != null) {
        try {
          this.apiS.addUsuario({
            id: this.atribuser.id,
            nombre: this.formUsuario.get('nombre')?.value,
            correo: this.formUsuario.get('correo')?.value,
            documentos: this.formUsuario.get('documentos')?.value,
            rol: { nombre: "Empresa" },
            alta: this.formUsuario.get('alta')?.value,
          }).subscribe(d => {
            //la respuesta del servidor
            //ocultador loading
          })
        } catch (error) {
          console.error(error);
          //ocular loading
        }
      } else {
        try {
          this.apiS.addUsuario({
            id: this.atribuser.id,
            nombre: this.formUsuario.get('nombre')?.value,
            correo: this.formUsuario.get('correo')?.value,
            documentos: this.formUsuario.get('documentos')?.value,
            rol: { nombre: "Alumno" },
            alta: this.formUsuario.get('alta')?.value,
          }).subscribe(d => {
            //la respuesta del servidor
            //ocultador loading
          })
        } catch (error) {
          console.error(error);
          //ocular loading
        }
      }
      this.cancel();
    }
  }

}
