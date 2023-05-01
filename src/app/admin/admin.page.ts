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
  darkMode: boolean;
  user: Usuario[] = [];
  searched: Usuario[] = [];

  constructor(private modalCtrl: ModalController, 
    private apiS: APIService,
    private login: LoginService) {
   }

  ngOnInit() {
    this.refresUsers();
    this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
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

  cambio() {
    document.body.classList.toggle( 'dark' );
  }

}