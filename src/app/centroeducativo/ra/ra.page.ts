import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonTitle, ModalController } from '@ionic/angular';
import { ModuloListaRaPage } from 'src/app/pages/modulo-lista-ra/modulo-lista-ra.page';
import { APIService } from 'src/app/services/api.service';
import { Modulo } from 'src/model/Modulo';
import { Ra } from 'src/model/Ra';

@Component({
  selector: 'app-ra',
  templateUrl: './ra.page.html',
  styleUrls: ['./ra.page.scss'],
})
export class RaPage implements OnInit {
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
