import { Component, Input, OnInit } from '@angular/core';
import { IonTitle, ModalController, NavParams } from '@ionic/angular';
import { ModuloEditPage } from 'src/app/pages/modulo-edit/modulo-edit.page';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { APIService } from 'src/app/services/api.service';
import { Modulo } from 'src/model/Modulo';
import { RaPage } from '../ra/ra.page';
import { Titulo } from 'src/model/Titulo';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.page.html',
  styleUrls: ['./modulo.page.scss'],
})
export class ModuloPage implements OnInit {
  public listModulo: Modulo[] = [];
  public filter: Modulo[] = [];
  public permision: boolean;

  constructor(
    private apiS: APIService,
    private login: LoginService,
    private modalCtrl: ModalController,
    private actroute: ActivatedRoute) {
  }

  ngOnInit() {
    this.load();
  }
  public async load() {
    await this.login.keepSession();
    this.apiS.getModulo().subscribe(listmodulos => {
      this.listModulo = listmodulos;
    })
    this.apiS.getModulo().subscribe(listmodulos => {
      this.filter = listmodulos;
      return this.filter;
    })
  }



  public async listaRAModul(atribModul: any) {
    const modal = await this.modalCtrl.create({
      component: RaPage,
      componentProps: {
        codmodul: atribModul.cod_mod_boja,
        nommodul: atribModul.nombre
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  public async addModul() {
    const modal = await this.modalCtrl.create({
      component: ModuloEditPage
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  handleChange(event: any) {
    const searchTerm = event.target.value;
    this.filter = this.listModulo;
    if (searchTerm && searchTerm.trim() != '') {
      this.filter = this.filter.filter((modulo: any) => {
        return (modulo.nombre?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      })
    }
  }

  cerrarSesion() {
    this.login.logout();
  }
}


