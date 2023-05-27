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
  darkMode: boolean;
  //donde se van a guradar los encargos
  public encargos: Array<Encargo> = [] = [];
  constructor(
    private apiS: APIService, 
    private login: LoginService,
    private router:Router,
    private modalCtrl: ModalController,
    ) { }

  ionViewWillEnter() {
    
  }
  ngOnInit() {
    this.login.keepSession();
    //se obtienen los encargos y se insertan en el array encargos
    this.refresEncargos();
    this.login.getRol();
    this.theme();
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
    console.log("Cerrando")
  }

  theme(){ 
    this.darkMode=JSON.parse(localStorage.getItem('theme')!);
    if(this.darkMode){
      document.body.classList.toggle( 'dark' );
    }
  }
  cambio() {
    const body = document.body;
    if (body.classList.contains('dark')) {
      localStorage.setItem('theme', JSON.stringify(false));
    }else{
      localStorage.setItem('theme', JSON.stringify(true));
    }
    document.body.classList.toggle( 'dark' );
  }

  public async editTask(){
  
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: { },
    });
    return await modal.present();
  }
  
   
}

