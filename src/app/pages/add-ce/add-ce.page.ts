import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-ce',
  templateUrl: './add-ce.page.html',
  styleUrls: ['./add-ce.page.scss'],
})
export class AddCEPage implements OnInit {
  @Input('editable') editable:string = "false";
  enEdicion = false; // variable que indica si el formulario está en modo de edición

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

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
