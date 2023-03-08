import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-edit-ce',
  templateUrl: './edit-ce.page.html',
  styleUrls: ['./edit-ce.page.scss'],
})
export class EditCEPage implements OnInit {

  @Input('editable') editable:string = "false";
  dUserCE: Usuario;

  constructor(private modalCtrl: ModalController, private apiS: APIService, private navParams: NavParams) {
  }

  ngOnInit() {
    const aux = this.apiS.Usuario;
    console.log(aux);
  }

  updateUserCE() {

    this.apiS.updateCentroEducativo({
      nombre: this.dUserCE.nombre,
      alta: this.dUserCE.alta,
      rol: this.dUserCE.rol,
      doc: this.dUserCE.doc,
      correo: this.dUserCE.correo

    });
    this.modalCtrl.dismiss();
  }

}
