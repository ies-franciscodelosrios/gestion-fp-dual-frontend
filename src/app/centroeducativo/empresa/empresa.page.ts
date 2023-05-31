import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CEUserEditPage } from 'src/app/pages/ce-user-edit/ce-user-edit.page';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { EditProfilePage } from 'src/app/pages/edit-profile/edit-profile.page';

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

  public async editAvatar(){
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: { },
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
    //A traves de localStorage se obtene la cadena 'darkTheme'
    let theme =localStorage.getItem('darkTheme');
    //Se comprueba si esta 'true' o 'false' para detectar el cambio de tema
    if(theme=="False"){
      if(document.body.classList.contains('dark')){
        document.body.classList.toggle('dark'); 
      }
    }else{
      if(!document.body.classList.contains('dark')){
        document.body.classList.toggle('dark'); 
      }
    }
  }

  //Funcion auxiliar para theme
  change() {
    let theme =localStorage.getItem('darkTheme');
    if(theme=="False"){
      this.darkMode=true;
      localStorage.setItem('darkTheme', "True");
    }else{
      this.darkMode=false;
      localStorage.setItem('darkTheme', "False");
    }
    document.body.classList.toggle('dark');
  }

  cerrarSesion() {
    this.login.logout();
  }
}
