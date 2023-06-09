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
    this.changeButton();
  }

  ionViewWillEnter() {
    this.theme();
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
      this.filter = this.filter.filter((practica: any) => {
        return (practica.id_empresa.nombre?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
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
