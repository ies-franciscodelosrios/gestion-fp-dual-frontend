import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TituloEditPage } from 'src/app/pages/titulo-edit/titulo-edit.page';
import { APIService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { Titulo } from 'src/model/Titulo';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.page.html',
  styleUrls: ['./titulo.page.scss'],
})
export class TituloPage implements OnInit {
  public tituls: TituloEditPage[] = [];
  public results = this.tituls;
  public listTitulo: Titulo[] = [];
  public filter: Titulo[] = [];

  public objsselect: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiS: APIService,
    private login: LoginService,
    private modalCtrl: ModalController) { }


  ngOnInit() {
    this.load();
  }
  public async load() {
    await this.login.keepSession();
    this.apiS.getTitulo().subscribe(listTitulo => {
      this.listTitulo = listTitulo;
    })
    this.apiS.getTitulo().subscribe(rol => {
      this.filter = this.listTitulo;
      return this.filter
    })
  }

  public async toTitleToModul(lista: any) {
    this.objsselect = lista
    this.router.navigate(['/centroeducativo/modulo'],  { state: { elememe: this.objsselect} });
  }

  public async addTitle() {
    const modal = await this.modalCtrl.create({
      component: TituloEditPage,
      componentProps: {
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  handleChange(event: any) {
    const searchTerm = event.target.value;
    this.filter = this.listTitulo;
    if (searchTerm && searchTerm.trim() != '') {
      this.filter = this.filter.filter((titulo: any) => {
        return (titulo.nombre?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      })
    }
  }

  cerrarSesion() {
    this.login.logout();
  }
}

