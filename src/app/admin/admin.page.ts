import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';
import { AddCEPage } from '../pages/add-ce/add-ce.page';
import { APIService } from '../services/api.service';
import { LoginService } from '../services/login.service';
import { EditCEPage } from '../pages/edit-ce/edit-ce.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  //tema oscuro o claro
  darkMode?: boolean;
  user: Usuario[] = [];
  searched: Usuario[] = [];

  constructor(private modalCtrl: ModalController, 
    private apiS: APIService,
    private login: LoginService) {
  }

  ionViewWillEnter() {
    this.login.keepSession();
    //se obtienen los encargos y se insertan en el array encargos
    this.refresUsers();
    this.theme();   
  }
 

  ngOnInit() {
    this.changeButton();
  }

 async refresUsers() {
    await this.login.keepSession();
    this.apiS.getUsuarioCentro().subscribe(rol => {
      this.user = <Usuario[]> rol.user;
      return this.user;
    });

    this.apiS.getUsuarioCentro().subscribe(rol => {
      this.searched = <Usuario[]> rol.user;
      return this.searched;
    });
  }

  async addUser() {
    const modal = await this.modalCtrl.create({
      component: AddCEPage
    });
    modal.onDidDismiss().then(() => {
      this.refresUsers();
    });
    return await modal.present();
  }

  async editUser(user: Usuario) {
    const modal = await this.modalCtrl.create({
      component: EditCEPage,
      componentProps: {
        dataUser: user
      }
    });
    modal.onDidDismiss().then(() => {
      this.refresUsers();
    });
    return await modal.present();
  }

  searchUserByName(event:any) {
    const text = event.target.value;
    this.searched = this.user;
    if(text && text.trim() != '') {
      this.searched = this.searched.filter((user: any) => {
          return (user.nombre?.toLowerCase().indexOf(text.toLowerCase()) > -1);
      });
    }
  }

  logOut() {
    this.login.logout();
  }

  theme() { 
    //Pilla el tema oscuro del localstore
    let theme = localStorage.getItem('darkTheme');
   
    //En caso de tema oscuro esta desactivado
    if(theme == "False") {
      //Si la pagina esta oscuro
      if(document.body.classList.contains('dark')) {
        //Cambia a claro 
        document.body.classList.toggle('dark'); 
      }
    //En caso de tema oscuto esta activado
    }else {
      //Si la pagina NO esta oscuro
      if(!document.body.classList.contains('dark')) {
        //Cambia a oscuro
        document.body.classList.toggle('dark'); 
      }
    }
  }

  change() {
    //Pilla el tema oscuro del localstore
    let theme = localStorage.getItem('darkTheme');
    //En caso de tema oscuro esta desactivado
    if(theme == "False") {
      //El boton de tema oscuro se activa
      this.darkMode = true;
      //Cambiamos a que guarde que tenga el tema oscuro
      localStorage.setItem('darkTheme', "True");
    }else  {
      //El boton de tema oscuro se desactiva
      this.darkMode = false;
      //Cambiamos a que guarde que NO tenga el tema oscuro
      localStorage.setItem('darkTheme', "False");
    }
    //document.body.classList.toggle('dark');
  }

  changeButton() {
    let theme = localStorage.getItem('darkTheme');
    if(theme == "False") {
      this.darkMode = false;
    }else {
      this.darkMode = true;
    }
  }

}