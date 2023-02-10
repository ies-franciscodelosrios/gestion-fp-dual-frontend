import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditCEComponent } from '../components/edit-ce/edit-ce.component';
import { FormPage } from '../pages/form/form.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  users: any = [];
  searchedUser: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.searchedUser = this.users;
  }

  async openForm() {
    const modal = await this.modalCtrl.create({
      component: EditCEComponent,
    });
    return await modal.present();
  }

  async editForm() {
    const modal = await this.modalCtrl.create({
      component: EditCEComponent,
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

  cerrarSesion() {

  }
}
