import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-edit-ce',
  templateUrl: './edit-ce.page.html',
  styleUrls: ['./edit-ce.page.scss']
})
export class EditCEPage implements OnInit {

  @Input('editable') editable:string = "false";
  @Input() dataUser: Usuario;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  public editUser: FormGroup

  constructor(private modalCtrl: ModalController, 
    private formBuilder: FormBuilder, 
    private apiS: APIService) {
  }

  ngOnInit() {
    this.editUser = this.formBuilder.group({
      nombre: [this.dataUser.nombre, [Validators.required]],
      doc: [this.dataUser.documentos],
      correo: [this.dataUser.correo]
    })
  }

  updateUser() {
    this.dataUser.nombre = this.editUser.get('nombre')?.value;
    this.dataUser.documentos = this.editUser.get('doc')?.value;
    this.dataUser.correo = this.editUser.get('correo')?.value;

    this.apiS.updateCentroEducativo({
      id: this.dataUser.id,
      nombre: this.dataUser.nombre,
      documentos: this.dataUser.documentos,
      correo: this.dataUser.correo,
      alta: this.dataUser.alta,
      rol: { "nombre": "Centro educativo" }
    }).subscribe();
    
    this.closeModal.emit(true);
    this.modalCtrl.dismiss();
  }

  deleteUser() {
    this.apiS.deleteUsuario(this.dataUser.id);
    this.modalCtrl.dismiss();
  }

}
