import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonTitle, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ModuloListaRaPage } from 'src/app/pages/modulo-lista-ra/modulo-lista-ra.page';
import { ModuloEditPage } from 'src/app/pages/modulo-edit/modulo-edit.page';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.page.html',
  styleUrls: ['./modulo.page.scss'],
})
export class ModuloPage implements OnInit {
  titulo = 'Módulo';

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }


  toBack(){
    this.router.navigate(['/centroeducativo/titulo']);
  }

  public async listaRAModul() {
    const modal = await this.modalCtrl.create({
      component: ModuloListaRaPage
    });
    return await modal.present();
  }

  public async addModul() {
    const modal = await this.modalCtrl.create({
      component: ModuloEditPage
    });
    return await modal.present();
  }
  cerrarSesion(){
    
  }
}


