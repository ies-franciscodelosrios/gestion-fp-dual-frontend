import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { EditProfilePage } from '../pages/edit-profile/edit-profile.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  public name?: string;
  public subtittle?: string;

  constructor(
    private menu: MenuController,
    private router: Router,
    private modalCtrl: ModalController,
    private login: LoginService,) { }

  ngOnInit() {
    this.loadUsers();
  }

  public async loadUsers(){
    await this.login.keepSession(); 
    this.name= await this.login.user.nombre;
    this.subtittle = await this.login.user.correo;
  }
  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  openEnd() {
    this.menu.open('end');
  }
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  clMenu(){
    this.menu.close();
  }

  public async editAvatar(){
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: { },
    });
    return await modal.present();
  }

  redirectTo(valor: string) {
    this.router.navigate(['/centroeducativo/', valor]);
  }

}
