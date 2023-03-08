import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonModal, IonTitle, ModalController } from "@ionic/angular";
import { APIService } from "src/app/services/api.service";
import { Modulo } from "src/model/Modulo";
import { Titulo } from "src/model/Titulo";


@Component({
  selector: 'app-modulo-edit',
  templateUrl: './modulo-edit.page.html',
  styleUrls: ['./modulo-edit.page.scss'],
})
export class ModuloEditPage implements OnInit {
  public formModulo: FormGroup;
  public listaTitulos: Titulo[] = []
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  @Output() modulUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
  ) {
  }

  ngOnInit() {
    this.formModulo = this.formBuilder.group({
      cod_mod_boja: ['', [Validators.required, Validators.pattern('\[0-9]{4}')]],
      nombre: ['', [Validators.required,Validators.pattern('[A-zÁ-ÿ ]{3,120}') ]],
      titulo: ['', [Validators.required, Validators.required]],
    })
    this.apiS.getTitulo().subscribe(titulo => {
      this.listaTitulos = titulo;
    })
  }

  cancel() {
    this.modulUpdate.emit(true);
    this.modalCTRL.dismiss(null, 'cancel');
  }

  submitForm() {
    try {
      this.apiS.addModulo({
        cod_mod_boja: this.formModulo.get('cod_mod_boja')?.value,
        nombre: this.formModulo.get('nombre')?.value,
        titulo: {id:this.formModulo.get('titulo')?.value},
      }).subscribe(d => {
        //la respuesta del servidor
        //ocultador loading
      })
    } catch (error) {
      console.error(error);
      //ocular loading
    }
    this.cancel();
  }
}
