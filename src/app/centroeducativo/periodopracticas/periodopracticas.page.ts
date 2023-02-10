import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PracticasPage } from 'src/app/pages/practicas/practicas.page';

@Component({
  selector: 'app-periodopracticas',
  templateUrl: './periodopracticas.page.html',
  styleUrls: ['./periodopracticas.page.scss'],
})
export class PeriodopracticasPage implements OnInit {
  practica = 'Practicas';
  public practicas: PracticasPage[] = [];
  public results = this.practicas;

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  public async nuevaPractica() {
    const modal = await this.modalCtrl.create({
      component: PracticasPage,
      componentProps:{
        practica: this.practica
      }
    });
    return await modal.present();
  }

}
