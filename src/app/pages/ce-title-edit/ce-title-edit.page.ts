import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { Titulo } from 'src/model/Titulo';

@Component({
  selector: 'app-ce-title-edit',
  templateUrl: './ce-title-edit.page.html',
  styleUrls: ['./ce-title-edit.page.scss'],
})
export class CeTitleEditPage implements OnInit {
  public title: string = "";
  public formTitulo: FormGroup;  //el grupo del formulario reactivo , ojo con importar ReactiveFormModule
  @Input('atribtitle') atribtitle: Titulo;
  @Input('mode') mode: string;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    private alrtCtrl: AlertController,
  ) {

  }
  ngOnInit() {
    if (this.mode == "create") {
      this.title == "Crear";
      const btnelem = document.getElementById('btnDelete') as HTMLElement;
      btnelem.style.display = 'none';
      this.formTitulo = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.pattern('\[aA-zZ]{2,7}')]],
      })
    } else if (this.mode == "edit") {
      this.title == "Editar";
      this.formTitulo = this.formBuilder.group({
        nombre: [this.atribtitle.nombre, [Validators.required, Validators.pattern('\[aA-zZ]{2,7}')]],
      })
    }

  }
  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }
  submitForm() {
    if (this.mode == "create") {
      try {
        this.apiS.addTitulo({ 
          nombre: this.formTitulo.get('nombre')?.value,
        }).subscribe(d => {
        })
      } catch (error) {
      }
    } else {
      try {
        this.apiS.addTitulo({
          id: this.atribtitle.id,
          nombre: this.formTitulo.get('nombre')?.value,
        }).subscribe(d => {
        })
      } catch (error) {
        console.error(error);
      }
    }
    this.cancel();
  }

  onDelete() {
    this.alrtCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Realmente quieres eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          handler: () => {
            this.apiS.deleteTitulo(this.atribtitle.id).subscribe((respuesta) => {
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
