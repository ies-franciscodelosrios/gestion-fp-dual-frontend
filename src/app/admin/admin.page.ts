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
  /* Array de usuarios que vamos a almacenar */
  user: Usuario[] = [];
  /* Array de usuarios buscados */
  searched: Usuario[] = [];

  constructor(private modalCtrl: ModalController, 
    private apiS: APIService,
    private login: LoginService) {
  }

  /* Este método consiste en mantener la sesión del usuario
  y los usuarios que hayan creados en la lista 
  una vez que refresques la página. */
  ionViewWillEnter() {
    this.login.keepSession();
    //se obtienen los usuarios y se insertan en el array usuarios
    this.refresUsers();
    this.theme();
    
  }

  ngOnInit() {
    this.changeButton();
  }

  /* Este método se encarga de refrescar los usuarios
  a la hora de que sean insertados o modificados y 
  mostrar sólo los usuarios cuyo rol sean centros educativos */
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

  /* Este método consiste en abrir un modal
  mediante un botón para la creación del nuevo usuario. */
  async addUser() {
    const modal = await this.modalCtrl.create({
      component: AddCEPage
    });
    modal.onDidDismiss().then(() => {
      this.refresUsers();
    });
    return await modal.present();
  }

  /* Este método consiste en abrir un modal
  para editar el usuario dado */
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

  /* Este método consiste en buscar los usuarios
  por su nombre */
  searchUserByName(event:any) {
    const text = event.target.value;
    this.searched = this.user;
    if(text && text.trim() != '') {
      this.searched = this.searched.filter((user: any) => {
          return (user.nombre?.toLowerCase().indexOf(text.toLowerCase()) > -1);
      });
    }
  }

  /* Este método consiste en cerrar sesión del usuario */
  logOut() {
    this.login.logout();
  }

  theme() { 
    //Pilla el tema oscuro del localstore
    let theme = localStorage.getItem('darkTheme');
    console.log(localStorage.getItem('darkTheme'))
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
    document.body.classList.toggle('dark');
  }

  /* Este método consiste en cambiar el botón
  a modo claro o a modo oscuro */
  changeButton() {
    let theme = localStorage.getItem('darkTheme');
    if(theme == "False") {
      this.darkMode = false;
    }else {
      this.darkMode = true;
    }
  }

}