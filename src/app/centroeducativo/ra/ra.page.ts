import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonAccordion, ModalController } from '@ionic/angular';
import { ModuloListaRaPage } from 'src/app/pages/modulo-lista-ra/modulo-lista-ra.page';
import { APIService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { Ce } from 'src/model/Ce';
import { Ra } from 'src/model/Ra';

@Component({
  selector: 'app-ra',
  templateUrl: './ra.page.html',
  styleUrls: ['./ra.page.scss'],
})

export class RaPage implements OnInit {
  public letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  public numero = [1,2,3,4,5,6,7,8,9];
  public formRA: FormGroup;
  public ListaRa: Ra[] = [];
  public ListaCe: Ce[] = [];
  
  public abreIndice: number = -1;
  



  @Input('codmodul') codmodul: any;
  @Input('nommodul') nommodul: any;
  @Output() RaUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChildren(IonAccordion) accordions: QueryList<IonAccordion>;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    private login: LoginService,
    private modalCtrl: ModalController,
  ) {
  }

  ngOnInit() {
    this.load();
  }
  public async load() {
    await this.login.keepSession();

    this.apiS.getRA().subscribe(listaRA => {
      this.ListaRa = listaRA;
      console.log(this.ListaRa)
    })

  }

  public async addRa(modul: any) {
    const modal = await this.modalCtrl.create({
      component: ModuloListaRaPage,
      componentProps: {
        nommodul: modul

      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  toggleAccordion(index: number) {
    if (index === this.abreIndice) {
      // Si el índice es el mismo que el actual, cerrar el accordion
      this.abreIndice = -1;
    } else {
      // Si el índice es diferente al actual, abrir el accordion
      this.abreIndice = index;
    }
  }

  cancel() {
    this.RaUpdate.emit(true);
    this.modalCTRL.dismiss(null, 'cancel');
  }

  submitForm() {
  }

}
