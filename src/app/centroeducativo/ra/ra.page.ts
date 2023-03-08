import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ModuloListaRaPage } from 'src/app/pages/modulo-lista-ra/modulo-lista-ra.page';
import { APIService } from 'src/app/services/api.service';
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

  @Input('codmodul') codmodul: any;
  @Input('nommodul') nommodul: any;
  @Output() RaUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    private modalCtrl: ModalController,
  ) {
  }

  ngOnInit() {
    this.apiS.getRA().subscribe(listaRA => {
      this.ListaRa = listaRA;
    })
  }

  public async addRa() {
    const modal = await this.modalCtrl.create({
      component: ModuloListaRaPage,
      componentProps: {
      }
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
