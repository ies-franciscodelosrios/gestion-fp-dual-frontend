import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CEUserEditPage } from 'src/app/pages/ce-user-edit/ce-user-edit.page';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {
  public titulo: string;
  empresa = 'Empresa';
  public listEmpresa: Usuario[] = [];
  public filter: Usuario[] = [];
  public empresas: CEUserEditPage[] = [];
   //tema oscuro o claro
  darkMode: boolean;
  constructor(
    private titleSV: Title,
    private apiS: APIService,
    private login: LoginService,
    private router: Router,
    private modalCtrl: ModalController) {
    this.titulo = this.titleSV.getTitle();
  }

  ngOnInit() {
    this.load();
  }
  public async load() {
    this.theme();
    await this.login.keepSession();
    this.apiS.getUsuarioEmpresa().subscribe(rol => {
      this.listEmpresa = <Usuario[]>rol.user;
      return this.listEmpresa;
    });
    this.apiS.getUsuarioEmpresa().subscribe(rol => {
      this.filter = <Usuario[]>rol.user;
      return this.filter;
    });
  }

  public async nuevaempresa() {
    let emp = document.getElementById("Alumno");
    if (emp != null) {
      emp.id = "Empresa"
    }
    const modal = await this.modalCtrl.create({
      component: CEUserEditPage,
      componentProps: {
        mode: "create"
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }
  public async editaempresa(empr: Usuario) {
    let emp = document.getElementById("Alumno");
    if (emp != null) {
      emp.id = "Empresa"
    }
    const modal = await this.modalCtrl.create({
      component: CEUserEditPage,
      componentProps: {
        mode: "edit",
        atribuser: empr
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  handleChange(event: any) {
    const searchTerm = event.target.value;
    this.filter = this.listEmpresa;
    if (searchTerm && searchTerm.trim() != '') {
      this.filter = this.filter.filter((usuario: any) => {
        return (usuario.nombre?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      })
    }
  }

  theme(){ 
    const body = document.body;
    this.darkMode=JSON.parse(localStorage.getItem('theme')!);
    if(this.darkMode){
      if (!body.classList.contains('dark')) {
        document.body.classList.toggle( 'dark' );
      }
    }else{
      if (body.classList.contains('dark')) {
        document.body.classList.toggle( 'dark' );
      }
    }
  }
  cambio() {
    const body = document.body;
    if (body.classList.contains('dark')) {
      localStorage.setItem('theme', JSON.stringify(false));
    }else{
      localStorage.setItem('theme', JSON.stringify(true));
    }
    document.body.classList.toggle( 'dark' );
  }

  cerrarSesion() {
    this.login.logout();
  }
}
