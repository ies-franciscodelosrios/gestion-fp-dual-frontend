import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonTitle, ModalController } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { Modulo } from 'src/model/Modulo';
import { Ra } from 'src/model/Ra';


@Component({
  selector: 'app-modulo-lista-ra',
  templateUrl: './modulo-lista-ra.page.html',
  styleUrls: ['./modulo-lista-ra.page.scss'],
})
export class ModuloListaRaPage implements OnInit {
  public formRA: FormGroup;
  public modulos: Modulo;
  public ListaRa: Ra[] =[];


  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  @Output() RaUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
  ) {
  }

  ngOnInit() {
    this.formRA = this.formBuilder.group({
      cod_mod_boja: ['', [Validators.required, Validators.pattern('\[0-9]{4}')]],
      nombre: ['', [Validators.required, Validators.pattern('[A-zÁ-ÿ ]{3,120}')]],
      titulo: ['', [Validators.required, Validators.required]],
    })
    this.apiS.getTitulo().subscribe(titulo => {
      //this.listaTitulos = titulo;
    })
  }

  cancel() {
    this.RaUpdate.emit(true);
    this.modalCTRL.dismiss(null, 'cancel');
  }

  submitForm() {
    try {
      this.apiS.addModulo({
        cod_mod_boja: this.formRA.get('cod_mod_boja')?.value,
        nombre: this.formRA.get('nombre')?.value,
        titulo: { id: this.formRA.get('titulo')?.value },
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
