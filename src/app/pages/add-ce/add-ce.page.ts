import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
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

  // Array de usuarios almacenados
  user: Usuario[] = []; 
  addUser: FormGroup;
  enEdicion = false; // variable que indica si el formulario está en modo de edición
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private modalCtrl: ModalController, 
    private apiS: APIService,
    private formBuilder: FormBuilder) { }

  /* Este método consiste en rellenar todos los campos
  del formulario para la creación de un nuevo usuario. */
  ngOnInit() {
    this.addUser = this.formBuilder.group({
      nombre: ['', Validators.required],
      doc: ['', [Validators.required, this.validateDocument]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  /* Este método consiste en validar un DNI correcto */
  validateDocument(control: any) {
    const pattern = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    if (pattern.test(control.value)) {
      return pattern;
    }
    return { 'invalidDocumento': true };
  }

  /* Este método consiste en añadir un nuevo usuario
  mediante sus propios datos/atributos. */
  onSubmit() {
    this.apiS.addUsuario({
      nombre: this.addUser.get('nombre')?.value,
      alta: true,
      rol: { id: 2, nombre: 'Centro educativo' },
      documentos: this.addUser.get('doc')?.value,
      correo: this.addUser.get('correo')?.value
    }).subscribe(d => {
    });
    this.closeModal.emit(true);
    this.modalCtrl.dismiss();
  }

  /* Este método consiste en volver hacia atrás,
  es decir, hacer click en el botón Cancelar. */
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
