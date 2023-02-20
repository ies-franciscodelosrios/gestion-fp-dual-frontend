import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PracticasPage } from 'src/app/pages/practicas/practicas.page';
import { APIService } from 'src/app/services/api.service';
import { PeriodoPracticas } from 'src/model/PeriodoPracticas';

@Component({
  selector: 'app-periodopracticas',
  templateUrl: './periodopracticas.page.html',
  styleUrls: ['./periodopracticas.page.scss'],
})
export class PeriodopracticasPage implements OnInit {
  practica = 'Practicas';
  public practicas: PracticasPage[] = [];
  public results = this.practicas;

  public listPracticas: PeriodoPracticas[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private apiS: APIService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.apiS.GetPP().subscribe(listPracticas => {
      this.listPracticas = listPracticas;
    })
  }

  public async nuevaPractica() {
    const modal = await this.modalCtrl.create({
      component: PracticasPage,
      componentProps: {
        practica: this.practica
      }
    });
    return await modal.present();
  }
  cerrarSesion() {

  }

}
