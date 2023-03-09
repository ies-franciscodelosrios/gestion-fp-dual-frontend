import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
  public letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n','ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  public formRA: FormGroup;
  public ListaRa: Ra[] = [];
  public ListaCe: Ce[] = []

  @Input('codmodul') codmodul: any;
  @Input('nommodul') nommodul: any;
  @Output() RaUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
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
    })
    this.apiS.getCE().subscribe(ListaCE => {
      this.ListaCe = ListaCE;
    })
  }

  public async addRa(modul:any) {
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

  cancel() {
    this.RaUpdate.emit(true);
    this.modalCTRL.dismiss(null, 'cancel');
  }

  submitForm() {
  }

}
