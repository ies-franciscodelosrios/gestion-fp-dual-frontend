import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CePracticesEditPage } from 'src/app/pages/ce-practices-edit/ce-practices-edit.page';
import { APIService } from 'src/app/services/api.service';
import { PeriodoPracticas } from 'src/model/PeriodoPracticas';
import { LoginService } from 'src/app/services/login.service';
import { EditProfilePage } from 'src/app/pages/edit-profile/edit-profile.page';

@Component({
  selector: 'app-periodopracticas',
  templateUrl: './periodopracticas.page.html',
  styleUrls: ['./periodopracticas.page.scss'],
})
export class PeriodopracticasPage implements OnInit {

  practica = 'Practicas';
  public practicas: CePracticesEditPage[] = [];
  public listPracticas: PeriodoPracticas[] = [];
  public filter: PeriodoPracticas[] = [];
  public results = this.practicas;
  //tema oscuro o claro
  darkMode: boolean;
  constructor(
    private http: HttpClient,
    private router: Router,
    private login: LoginService,
    private apiS: APIService,
    private modalCtrl: ModalController) { }


  ngOnInit() {
    this.load();
    this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  public async load() {
    await this.login.keepSession();
    this.apiS.getPP().subscribe(listPracticas => {
      this.listPracticas = listPracticas;
      return this.listPracticas;
    })
    this.apiS.getPP().subscribe(rol => {
      this.filter = this.listPracticas;
      return this.filter;
    })
  }

  public async nuevaPractica() {
    const modal = await this.modalCtrl.create({
      component: CePracticesEditPage,
      componentProps: {
        practica: this.practica,
        mode: "create"
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  public async editPractica(pract: PeriodoPracticas) {
    const modal = await this.modalCtrl.create({
      component: CePracticesEditPage,
      componentProps: {
        practica: this.practica,
        mode: "edit",
        atribPP: pract
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
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

  //Funcion auxiliar para theme
  change() {
    document.body.classList.toggle( 'dark' );
  }

  cerrarSesion() {
    this.login.logout();
  }
}
