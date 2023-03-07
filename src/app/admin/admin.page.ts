import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';
import { AddCEPage } from '../pages/add-ce/add-ce.page';
import { APIService } from '../services/api.service';
import { EditCEComponent } from '../components/edit-ce/edit-ce.component';
import { FormPage } from '../pages/form/form.page';
import { EditCEPage } from '../pages/edit-ce/edit-ce.page';
import { LoginService } from '../services/login.service';


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
    private loginS:LoginService) { }

  ngOnInit() {
    this.searchedUser = this.users;
    this.userApiService.GetCentroEducativo().subscribe((response) => {
      this.users = response
    });
    this.refresUsers();
  }

  refresUsers(){
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

  async editForm() {
    const modal = await this.modalCtrl.create({
      component: EditCEPage
    });
    return await modal.present();
  }

  searchAdmin(event:any) {
    const text = event.target.value;
    this.searchedUser = this.users;
    if(text && text.trim() != '') {
      this.searchedUser = this.searchedUser.filter((user: any)=>{
          return (user.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 1000);
  };

  cerrarSesion() {
    this.loginS.logout();
  }
}