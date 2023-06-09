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
  public permision: boolean;
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
    this.changeButton();
  }

  ionViewWillEnter() {
    this.theme();
  }

  public async load() {
    await this.login.keepSession();
    this.permision = true;
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
    //obtiene la variable del tema oscuro del localstore
    let theme =localStorage.getItem('darkTheme');
    //En caso de que el tema oscuro esta desactivado
    if(theme=="False"){
      //si la pagina esta en oscuro
      if(document.body.classList.contains('dark')){
        //cambia a claro 
        document.body.classList.toggle('dark'); 
      }
    //En caso de que el tema oscuro este activado
    }else{
      //si la pagina NO esta oscuro
      if(!document.body.classList.contains('dark')){
        //cambia a oscuro
        document.body.classList.toggle('dark'); 
      }
    }
  }

  change() {
     //obtiene la variable del tema oscuro del localstore
    let theme =localStorage.getItem('darkTheme');
     //En caso de que el tema oscuro esta desactivado
    if(theme=="False"){
      //Cambiamos darkMode a true para dejar el boton de tema oscuro como encendido
      this.darkMode=true;
      //Guardamos darkTheme con "True" para entender que el tema oscuro esta activo
      localStorage.setItem('darkTheme', "True");
    }else{
       //Cambiamos darkMode a false para dejar el boton de tema oscuro como apagado
      this.darkMode=false;
      //Guardamos darkTheme con "False" para entender que el tema oscuro esta desactivado
      localStorage.setItem('darkTheme', "False");
    }
    document.body.classList.toggle('dark');
  }

  changeButton(){
    //En caso de que la darkTheme sea False o True el boton de tema oscuro cambiara
    let theme =localStorage.getItem('darkTheme');
    if(theme=="False"){
      this.darkMode=false;
    }else{
      this.darkMode=true;
    }
  }

  cerrarSesion() {
    this.login.logout();
  }
}
