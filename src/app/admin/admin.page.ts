import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';
import { AddCEPage } from '../pages/add-ce/add-ce.page';
import { APIService } from '../services/api.service';
import { LoginService } from '../services/login.service';
import { EditCEComponent } from '../components/edit-ce/edit-ce.component';
import { FormPage } from '../pages/form/form.page';
import { LoginService } from '../services/login.service';
import { EditCePageModule } from '../pages/edit-ce/edit-ce.module';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  userCEList: Usuario[] = [];

  users: any = [];
  searchedUser: any;

  constructor(private modalCtrl: ModalController, 
    private userApiService: APIService,
    private login: LoginService) {
   }

  ngOnInit() {
    this.refresUsers();

    this.userApiService.GetUsuarioCentro().subscribe(rol => {
      this.userCEList = <Usuario[]> rol.user
      return this.userApiService
    });
  }

  refresUsers() {
    this.userApiService.GetCentroEducativo().subscribe((datos) => {
      for (let elemento of datos) {
        this.userCEList.push(<any>elemento);
      }
    });
  }

  async openForm() {
    const modal = await this.modalCtrl.create({
      component: AddCEPage
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
    return await modal.present();
  }

  searchUserCentEduc(event:any) {
    const text = event.target.value;
    this.searchedUser = this.users;
    if(text && text.trim() != '') {
      this.searchedUser = this.searchedUser.filter((user: any)=>{
          return (user.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }

  cerrarSesion() {
    this.login.logout();
  }
}