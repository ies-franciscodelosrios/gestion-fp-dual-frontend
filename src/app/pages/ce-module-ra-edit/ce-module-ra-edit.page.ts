import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { Modulo } from 'src/model/Modulo';
import { Ra } from 'src/model/Ra';

@Component({
  selector: 'app-ce-module-ra-edit',
  templateUrl: './ce-module-ra-edit.page.html',
  styleUrls: ['./ce-module-ra-edit.page.scss'],
})
export class CeModuleRaEditPage implements OnInit {
  public formRA: FormGroup;
  public modulos: Modulo;
  public listaModulos: Modulo[] = [];
  public ListaRa: Ra[] = [];
  public title: string = "";
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  @Input('codmodul') codmodul: Modulo;
  @Input('nommodul') nommodul: Modulo;
  @Input('idmodul') idmodul: Modulo;
  @Input('atribRa') atribRa: Ra;
  @Input('mode') mode: string;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private router: Router,
    private apiS: APIService,
    private alrtCtrl: AlertController,
  ) {
  }

  ngOnInit() {
    if (this.mode == "create") {
      this.title == "Crear";
      const btnelem = document.getElementById('btnDelete') as HTMLElement;
      btnelem.style.display = 'none';
      this.formRA = this.formBuilder.group({
        resultado: ['', [Validators.required, Validators.pattern('[A-zÁ-ÿ ]{3,120}')]],
      })
    } else if (this.mode == "edit") {
      this.title == "Editar";
      this.formRA = this.formBuilder.group({
        resultado: ['', [Validators.required, Validators.pattern('[A-zÁ-ÿ ]{3,120}')]],
      })
    }
  }

  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }

  submitForm() {
    if (this.mode == "create") {
    try {
      this.apiS.addRA({
        modulo: { id: this.idmodul },
        resultado: this.formRA.get('resultado')?.value,
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
      this.apiS.addRA({
        id: this.atribRa.id,
        nombre: this.formRA.get('nombre')?.value,
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
            this.apiS.deleteRa(this.atribRa.id).subscribe((respuesta) => {
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
