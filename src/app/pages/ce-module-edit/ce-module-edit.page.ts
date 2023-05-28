import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController } from "@ionic/angular";
import { ModuloPage } from "src/app/centroeducativo/modulo/modulo.page";
import { APIService } from "src/app/services/api.service";
import { Modulo } from "src/model/Modulo";
import { Titulo } from "src/model/Titulo";

@Component({
  selector: 'app-ce-module-edit',
  templateUrl: './ce-module-edit.page.html',
  styleUrls: ['./ce-module-edit.page.scss'],
})
export class CeModuleEditPage implements OnInit {
  public formModulo: FormGroup;
  public title: string = "";
  @Input('atribModule') atribModule: Modulo;
  @Input('atribTittle') atribTittle: Titulo;
  @Input('mode') mode: string;
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  @Output() modulUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    private alrtCtrl: AlertController,
  ) {
  }

  ngOnInit() {
    console.log(this.mode)
    console.log(this.atribModule)
    console.log(this.atribTittle)
    if (this.mode == "create") {
      this.title == "Crear";
      const btnelem = document.getElementById('btnDelete') as HTMLElement;
      btnelem.style.display = 'none';
      this.formModulo = this.formBuilder.group({
        cod_mod_boja: ['', [Validators.required, Validators.pattern('\[0-9]{4}')]],
        nombre: ['', [Validators.required, Validators.pattern('[A-zÁ-ÿ ]{3,120}')]],
      })
    } else if (this.mode == "edit") {
      this.title == "Editar";
      this.formModulo = this.formBuilder.group({
        cod_mod_boja: [this.atribModule.cod_mod_boja, [Validators.required, Validators.pattern('\[0-9]{4}')]],
        nombre: [this.atribModule.nombre, [Validators.required, Validators.pattern('[A-zÁ-ÿ ]{3,120}')]],
      })
    }
  }
  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }
  submitForm() {
    if (this.mode == "create") {
      try {
        this.apiS.addModulo({
          cod_mod_boja: this.formModulo.get('cod_mod_boja')?.value,
          nombre: this.formModulo.get('nombre')?.value,
          titulo: { id: this.atribTittle.id},
        }).subscribe(d => {
        })
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        this.apiS.addModulo({
          id: this.atribModule.id,
          cod_mod_boja: this.formModulo.get('cod_mod_boja')?.value,
          nombre: this.formModulo.get('nombre')?.value,
          titulo: { id: this.atribTittle.id},
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
            this.apiS.deleteModulo(this.atribModule.id).subscribe((respuesta) => {
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

