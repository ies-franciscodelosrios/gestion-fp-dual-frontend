import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-add-ce',
  templateUrl: './add-ce.page.html',
  styleUrls: ['./add-ce.page.scss'],
})
export class AddCEPage implements OnInit {

  @Input('editable') editable:string = "false";

  userCEList: Usuario[] = [];
  addUserCEForm: FormGroup;
  enEdicion = false; // variable que indica si el formulario está en modo de edición

  constructor(private modalCtrl: ModalController, 
    private apiS: APIService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addUserCEForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      doc: ['', [Validators.required, this.validateDocumento]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  validateDocumento(control:any) {
    const pattern = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    if (pattern.test(control.value)) {
      return null;
    }
    return { 'invalidDocumento': true };
  }

  onSubmit() {

    this.apiS.addUsuario({
      nombre: this.addUserCEForm.get('nombre')?.value,
      documentos: this.addUserCEForm.get('doc')?.value,
      correo: this.addUserCEForm.get('correo')?.value,
      alta: true,
      rol: {id:2,nombre:'Centro educativo'}
    }).subscribe(d => {
        console.log(d);
    });
    this.modalCtrl.dismiss();
  }

  back() {
    if (this.enEdicion) {
      // Desactivar el modo de edición del formulario
      this.enEdicion = false;
    } else {
      // Cerrar cualquier diálogo o modal que esté abierto
      this.modalCtrl.dismiss();
    }
  }
}
