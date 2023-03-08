import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PracticasPage } from 'src/app/pages/practicas/practicas.page';
import { APIService } from 'src/app/services/api.service';
import { PeriodoPracticas } from 'src/model/PeriodoPracticas';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-periodopracticas',
  templateUrl: './periodopracticas.page.html',
  styleUrls: ['./periodopracticas.page.scss'],
})
export class PeriodopracticasPage implements OnInit {
  practica = 'Practicas';
  public practicas: PracticasPage[] = [];
  public listPracticas: PeriodoPracticas[] = [];
  public filter : PeriodoPracticas[] = [];
  public results = this.practicas;

  
  constructor(
    private http: HttpClient,
    private router: Router,
    private login: LoginService,
    private apiS: APIService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.apiS.getPP().subscribe(listPracticas => {
      this.listPracticas = listPracticas;
    })
    this.apiS.getPP().subscribe(rol => {
      this.filter = this.listPracticas;
      return this.filter
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
  handleChange(event: any) {
    const searchTerm = event.target.value;
    this.filter = this.listPracticas;
    if (searchTerm && searchTerm.trim() != '') {
      this.filter = this.filter.filter((usuario: any) => {
        return (usuario.nombre?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      })
    }
  }

  cerrarSesion() {
    this.login.logout();
  }
}
