import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, NavController, AlertController} from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ce-user-edit',
  templateUrl: './ce-user-edit.page.html',
  styleUrls: ['./ce-user-edit.page.scss'],
})
export class CEUserEditPage implements OnInit {
  public usuario: string = "";
  public formUsuario: FormGroup;  //el grupo del formulario reactivo , ojo con importar ReactiveFormModule
  @Input('atribuser') atribuser: Usuario;
  @Input('mode') mode: string;
 @Output() usrUpdate: EventEmitter<boolean>=new EventEmitter<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private navController: NavController,
    private apiS: APIService,
    private alrtCtrl: AlertController,
    navParams: NavParams
  ) {
  }

  async ngOnInit() {
    if (this.mode == "create") {
      this.usuario = "Crear"
      const btnelem = document.getElementById('btnDelete') as HTMLElement;
      btnelem.style.display = 'none';
      this.formUsuario = this.formBuilder.group({ //creando los campos que serán controlados y validados por putUsuario
        nombre: ['', [Validators.required, Validators.pattern('\[A-zÁ-ÿ ]{3,50}')]],
        correo: ['', [Validators.required, Validators.email]],
        documentos: ['',[Validators.required, Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)]],
        rol: '',
        alta: true,
      })
    } else if (this.mode == "edit") {
      this.usuario = "Editar"
      //this.atribuser = await lastValueFrom(this.apiS.GetMailUsuario(<string>this.atribuser.correo));   
      this.formUsuario =  this.formBuilder.group({
        nombre: [this.atribuser.nombre, [Validators.required, Validators.minLength(4)]],
        correo: [this.atribuser.correo, [Validators.required, Validators.required]],
        documentos: [this.atribuser.documentos, [Validators.required, Validators.required]],
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

  onDelete(){
    this.alrtCtrl.create({
      header: '¿Estás seguro?',
      message:'¿Realmente quieres eliminar?',
      buttons:[
        {
          text: 'Cancelar',
          role:'cancel'
        },{
          text: 'Eliminar',
          handler:() => {
            this.apiS.deleteUsuario(this.atribuser.id).subscribe((respuesta) => {
            });
            this.cancel();
          }
        }
      ]
    }).then(alrtElem => {
      alrtElem.present();
    })  
  }

}
