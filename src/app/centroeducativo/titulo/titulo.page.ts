import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonTitle, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TituloEditPage } from 'src/app/pages/titulo-edit/titulo-edit.page';
import { Titulo } from 'src/model/Titulo';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.page.html',
  styleUrls: ['./titulo.page.scss'],
})
export class TituloPage implements OnInit {
  titulo = 'Título';
  public tituls: TituloEditPage[] = [];
  public results = this.tituls;

  public listTitulo: Titulo[] = [];



  constructor(
    private http: HttpClient,
    private router: Router,
    private apiS: APIService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.apiS.GetTitulo().subscribe(listTitulo => {
      this.listTitulo = listTitulo;
    })
  }


  public async toTitleToModul() {
    this.router.navigate(['/centroeducativo/modulo']);
  }

  public async addTitle() {
    const modal = await this.modalCtrl.create({
      component: TituloEditPage,
      componentProps: {
        titulo: this.titulo,
      }
    });
    return await modal.present();
  }
  cerrarSesion() {

  }
}

