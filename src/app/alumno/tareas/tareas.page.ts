import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from 'src/app/services/api.service';
import { Encargo } from 'src/model/Encargo';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ModalController} from '@ionic/angular';
import { EditProfilePage } from 'src/app/pages/edit-profile/edit-profile.page';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  //tema oscuro o claro
  darkMode?: boolean;
  //donde se van a guradar los encargos
  public encargos: Array<Encargo> = [] = [];
  constructor(
    private apiS: APIService, 
    private login: LoginService,
    private router:Router,
    private modalCtrl: ModalController,
    ) { }

  ionViewWillEnter() {
    this.login.keepSession();
    //se obtienen los encargos y se insertan en el array encargos
    this.refresEncargos();
    this.theme();
    
  }


  ngOnInit() {
    this.changeButton();
  }

  refresEncargos(){
    this.apiS.getEncargosAlumno(this.login.user.id).subscribe((datos) => {
      for (let elemento of datos) {
        this.encargos.push(<any>elemento);
      }
    });  
  }

  cerrarSesion(){
    this.login.logout();
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

  public async editTask(){
  
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: { },
    });
    return await modal.present();
  }
  
   
}

