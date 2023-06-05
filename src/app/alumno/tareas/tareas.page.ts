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
  //Esta variable indicara el estado del botón del tema oscuro
  darkMode?: boolean;
  //array con todos los encargos del alumno
  public encargos: Array<Encargo> = [] = [];
  constructor(
    private apiS: APIService, 
    private login: LoginService,
    private router:Router,
    private modalCtrl: ModalController,
    ) {}

  ionViewWillEnter() {
    //mantendra iniciado la cesión del usuario aunque recargue la pagina
    this.login.keepSession();
    //se obtienen los encargos y se insertan en el array encargos
    this.refresEncargos();
    //En caso de que este activado el tema oscuro lo aplicara
    this.theme();
    
  }

  ngOnInit() {
    //cambia el estado del boton del tema oscuro
    this.changeButton();
  }

  //Obtiene los esncargos del alumno
  refresEncargos(){
    this.apiS.getEncargosAlumno(this.login.user.id).subscribe((datos) => {
      for (let elemento of datos) {
        this.encargos.push(<any>elemento);
      }
    });  
  }

  //cierra la cesion iniciada por el usuario
  cerrarSesion(){
    this.login.logout();
  }

  theme(){ 
    //obtiene la variable del tema oscuro del localstore
    let theme =localStorage.getItem('darkTheme');
    //En caso de que el tema oscuro esta desactivado
    if(theme=="False"){
      //si la pagina esta en oscuro
      if(document.body.classList.contains('dark')){
        //cambia a claro 
        document.body.classList.toggle('dark'); 
      }
    //En caso de que el tema oscuro este activado
    }else{
      //si la pagina NO esta oscuro
      if(!document.body.classList.contains('dark')){
        //cambia a oscuro
        document.body.classList.toggle('dark'); 
      }
    }
  }

  cambio() {
     //obtiene la variable del tema oscuro del localstore
    let theme =localStorage.getItem('darkTheme');
     //En caso de que el tema oscuro esta desactivado
    if(theme=="False"){
      //Cambiamos darkMode a true para dejar el boton de tema oscuro como encendido
      this.darkMode=true;
      //Guardamos darkTheme con "True" para entender que el tema oscuro esta activo
      localStorage.setItem('darkTheme', "True");
    }else{
       //Cambiamos darkMode a false para dejar el boton de tema oscuro como apagado
      this.darkMode=false;
      //Guardamos darkTheme con "False" para entender que el tema oscuro esta desactivado
      localStorage.setItem('darkTheme', "False");
    }
    document.body.classList.toggle('dark');
  }

  changeButton(){
    //En caso de que la darkTheme sea False o True el boton de tema oscuro cambiara
    let theme =localStorage.getItem('darkTheme');
    if(theme=="False"){
      this.darkMode=false;
    }else{
      this.darkMode=true;
    }
  }

  //Abre un modal para editar la imagel del perfil del alumno
  public async editProfile(){
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: { },
    });
    return await modal.present();
  }
}

