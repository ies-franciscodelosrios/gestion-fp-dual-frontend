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

  userCEList: Usuario[] = [];
  searchedUser: Usuario[] = [];

  constructor(private modalCtrl: ModalController, 
    private userApiService: APIService,
    private login: LoginService) {
   }

  ngOnInit() {
    this.refresUsers();
  }

 async refresUsers() {
    await this.login.keepSession();
    this.userApiService.getUsuarioCentro().subscribe(rol => {
      this.userCEList = <Usuario[]> rol.user;
      return this.userCEList;
    });

    this.userApiService.getUsuarioCentro().subscribe(rol => {
      this.searchedUser = <Usuario[]> rol.user;
      return this.searchedUser;
    });
  }

  async openForm() {
    const modal = await this.modalCtrl.create({
      component: AddCEPage
    });
    modal.onDidDismiss().then(() => {
      this.refresUsers();
    });
    return await modal.present();
  }

  async editUserCE(user: Usuario) {
    const modal = await this.modalCtrl.create({
      component: EditCEPage,
      componentProps: {
        dUserCE: user
      }
    });
    modal.onDidDismiss().then(() => {
      this.refresUsers();
    });
    return await modal.present();
  }

  searchUserCentEduc(event:any) {
    const text = event.target.value;
    this.searchedUser = this.userCEList;
    if(text && text.trim() != '') {
      this.searchedUser = this.searchedUser.filter((usuario: any)=>{
          return (usuario.nombre?.toLowerCase().indexOf(text.toLowerCase()) > -1);
      });
    }
  }

  cerrarSesion() {
    this.login.logout();
  }
}