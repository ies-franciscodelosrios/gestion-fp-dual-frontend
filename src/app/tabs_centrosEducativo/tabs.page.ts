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
  public img?: string;
  public activeTab: string;
  public darkMode: boolean;

  constructor(
    private menu: MenuController,
    private router: Router,
    private modalCtrl: ModalController,
    private login: LoginService,) {

      this.activeTab = "empresa";
     }

  ngOnInit() {
    this.loadUsers();
  }

  public async loadUsers(){
    await this.login.keepSession(); 
    this.name= await this.login.user.nombre;
    this.subtittle = await this.login.user.correo;
    this.img= this.login.user.imagen;
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
    this.activeTab = valor;
  }

  theme(){ 
    //pilla el tema oscuro del localstore
    let theme =localStorage.getItem('darkTheme');
    //Em caso de  tema oscuro esta desactivado
    if(theme=="False"){
      //si la pagina esta oscuro
      if(document.body.classList.contains('dark')){
        //cambia a claro 
        document.body.classList.toggle('dark'); 
      }
    //Em caso de tema oscuto esta activado
    }else{
      //si la pagina NO esta oscuro
      if(!document.body.classList.contains('dark')){
        //cambia a oscuro
        document.body.classList.toggle('dark'); 
      }
    }
  }

  cambio() {
    //pilla el tema oscuro del localstore
    let theme =localStorage.getItem('darkTheme');
    //Em caso de  tema oscuro esta desactivado
    if(theme=="False"){
      //El boton de tema oscuro se activa
      this.darkMode=true;
      //cambiamos a que guarde que tenga el tema oscuro
      localStorage.setItem('darkTheme', "True");
    }else{
      //El boton de tema oscuro se desactiva
      this.darkMode=false;
      //cambiamos a que guarde que NO tenga el tema oscuro
      localStorage.setItem('darkTheme', "False");
    }
    document.body.classList.toggle('dark');
  }

  changeButton(){
    let theme =localStorage.getItem('darkTheme');
    if(theme=="False"){
      this.darkMode=false;
    }else{
      this.darkMode=true;
    }
  }

  cerrarSesion(){
    this.login.logout();
  }

}
