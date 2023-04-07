import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CeTitleEditPage } from 'src/app/pages/ce-title-edit/ce-title-edit.page';
import { APIService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { Titulo } from 'src/model/Titulo';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.page.html',
  styleUrls: ['./titulo.page.scss'],
})
export class TituloPage implements OnInit {
  public tituls: CeTitleEditPage[] = [];
  public results = this.tituls;
  public listTitulo: Titulo[] = [];
  public filter: Titulo[] = [];

  public tittle: any;

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

  public async toTitleToModul(tittle: any) {
    this.tittle = tittle;
    this.router.navigate(['/centroeducativo/modulo'], tittle.id);
  }

  public async addTitle() {
    const modal = await this.modalCtrl.create({
      component: CeTitleEditPage,
      componentProps: {
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  public async editTitle(title: Titulo) {
    const modal = await this.modalCtrl.create({
      component: CeTitleEditPage,
      componentProps: {
        atribtitle: title
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

