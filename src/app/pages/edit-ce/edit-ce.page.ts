import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-edit-ce',
  templateUrl: './edit-ce.page.html',
})
export class EditCEPage implements OnInit {

  @Input('editable') editable:string = "false";
  @Input() dUserCE: Usuario;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  public formEdit: FormGroup

  constructor(private modalCtrl: ModalController, 
    private formBuilder: FormBuilder, 
    private apiS: APIService) {
  }

  ngOnInit() {
    this.formEdit = this.formBuilder.group({
      nombre: [this.dUserCE.nombre, [Validators.required]],
      doc: [this.dUserCE.documentos],
      correo: [this.dUserCE.correo]
    })
  }

  updateUserCE() {
    this.dUserCE.nombre = this.formEdit.get('nombre')?.value;
    this.dUserCE.documentos = this.formEdit.get('doc')?.value;
    this.dUserCE.correo = this.formEdit.get('correo')?.value;

    this.apiS.updateCentroEducativo({
      id: this.dUserCE.id,
      nombre: this.dUserCE.nombre,
      documentos: this.dUserCE.documentos,
      correo: this.dUserCE.correo,
      alta: this.dUserCE.alta,
      rol: {"nombre":"Centro educativo"}
    });
    
    this.closeModal.emit(true);
    this.modalCtrl.dismiss();
  }

  deleteUserCE() {
    this.apiS.deleteUsuario(this.dUserCE.id).subscribe((respuesta) => {
      console.log(respuesta);
    });
    this.modalCtrl.dismiss();
  }

}
