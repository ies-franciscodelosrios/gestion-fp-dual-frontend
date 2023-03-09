import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  public listaModulos: Modulo[]=[];
  public ListaRa: Ra[] =[];
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  @Input('codmodul') codmodul: any;
  @Input('nommodul') nommodul: any;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private router: Router,
    private apiS: APIService,
  ) {
  }

  ngOnInit() {
    this.formRA = this.formBuilder.group({
      resultado: ['', [Validators.required, Validators.pattern('[A-zÁ-ÿ ]{3,120}')]],
    })
    this.apiS.getModulo().subscribe(modulo => {
      this.listaModulos = modulo;
    })
  }

  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }

  submitForm() {
    try {
      this.apiS.addRA({
        modulo: {id: this.codmodul},
        resultado: this.formRA.get('resultado')?.value,
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
