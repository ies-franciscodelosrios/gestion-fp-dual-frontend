import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonTitle, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TituloEditPage } from 'src/app/pages/titulo-edit/titulo-edit.page';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.page.html',
  styleUrls: ['./titulo.page.scss'],
})
export class TituloPage implements OnInit {
  titulo = 'Título';
  public tituls: TituloEditPage[] = [];
  public results = this.tituls;

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }


  public async toTitleToModul() {
    this.router.navigate(['/centroeducativo/modulo']);
  }

  public async addTitle() {
    const modal = await this.modalCtrl.create({
      component: TituloEditPage,
      componentProps: {
        titulo: this.titulo
      }
    });
    return await modal.present();
  }
}

